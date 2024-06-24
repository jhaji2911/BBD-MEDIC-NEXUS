import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserInput, LoginUserInput } from "./user.schema";
import bcrypt from "bcrypt";
import initORM from "../../db";
import { Auth, Session, User } from "../../entities";

const SALT_ROUNDS = 10;
export async function createUser(
  req: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const db = (await initORM()).em.fork();
  const { password, email, firstName, lastName } = req.body;

  const existingUser = await db.findOne(Auth, {
    email: { $eq: email },
  });

  if (existingUser) {
    return reply.code(401).send({
      message: "User already exists with this email",
    });
  }

  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({
      firstName,
      lastName,
      role: "HR",
    });

    await db.persistAndFlush(newUser);

    const newAuth = new Auth({
      email,
      password: hash,
      user: newUser, // Assuming Auth has a relation to User
    });

    await db.persistAndFlush(newAuth);

    // Fetch the user with the related auth information
    const createdUser = await db.findOne(Auth, {
      user: { $eq: newUser.id },
    });

    return reply.code(201).send(createdUser);
  } catch (e) {
    return reply.code(500).send(e);
  }
}

export async function login(
  req: FastifyRequest<{
    Body: LoginUserInput;
  }>,
  reply: FastifyReply
) {

  try {
    const db = (await initORM()).em.fork();
    const { email, password } = req.body;
    /*
     MAKE SURE TO VALIDATE  user data
     before performing the db query
    */
    //
  
    //using populate we perform access fk join to get the related data from Auth and User collections
    const userAuth = await db.findOne(
      Auth,
      { email: { $eq: email } },
      {
        populate: ["user"],
      }
    );
  
    const isMatch =
      userAuth && (await bcrypt.compare(password, userAuth.password));
    if (!userAuth || !isMatch) {
      return reply.code(401).send({
        message: "Invalid email or password",
      });
    }
  
    const payload = {
      id: userAuth.user.id,
      email: userAuth.email,
      firstName: userAuth.user.firstName,
      lastName: userAuth.user.lastName,
      role: userAuth.user.role
    };
    const token = req.jwt.sign(payload);
  
    const newSession = new Session({
      user: userAuth.user.id,
      token,
      status: "Active",
      expiryDate: new Date(Date.now() + 1000 * 60 * 60),
    });

    console.log('newSession=>', newSession)
  
    await db.persistAndFlush(newSession);
  
    reply.setCookie("access_token", token, {
      path: "/",
      httpOnly: true,
      secure: true,
    });
    return reply.code(200).send({ accessToken: token });
  }
  catch(err)
  {
    console.log("Error in login", err)
    return reply.code(500).send({ message: "Internal Server Error" });
  }
  
}

export async function getUsers(req: FastifyRequest, reply: FastifyReply) {
  
  try {
    const db = (await initORM()).em.fork();
    const users = await db.find(User, {});
  
    return reply.code(200).send(users);
  }
  catch(err){
    console.log(err);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
  
}

export async function logout(req: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("access_token");
  return reply.send({ message: "Logout successful" });
}
