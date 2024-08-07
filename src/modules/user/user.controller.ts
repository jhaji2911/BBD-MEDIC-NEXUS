import { FastifyRequest, FastifyReply } from "fastify";
import {
  CreateUserInput,
  LoginUserInput,
  UserAddressInput,
} from "./user.schema";
import initORM from "../../db";
import { Auth, Demographics, Session, User } from "../../entities";

const SALT_ROUNDS = 10;
export async function createUser(
  req: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const db = (await initORM()).em.fork();
  const {
    password,
    email,
    firstName,
    lastName,
    SSN,
    dateOfBirth,
    phone,
    image,
    suffix,
  } = req.body;

  const existingUser = await db.findOne(Auth, {
    email: { $eq: email },
  });

  if (existingUser) {
    return reply.code(401).send({
      message: "User already exists with this email",
    });
  }

  try {
    const newUser = new User({
      suffix,
      email,
      firstName,
      image,
      lastName,
      SSN,
      phone,
      dateOfBirth,
    });

    await db.persistAndFlush(newUser);

    const newAuth = new Auth({
      email,
      password: password,
      user: newUser, // Assuming Auth has a relation to User
    });

    await db.persistAndFlush(newAuth);

    return reply.code(201).send({
      id: newUser.id,
      email: newUser.email,
    });
  } catch (e) {
    return reply.code(500).send(e);
  }
}

export async function getUserAddress(
  req: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  res
) {
  const { id } = req.params;
  const db = (await initORM()).em.fork();

  try {
    const address = await db.findOne(Demographics, {
      user: { id: { $eq: id } },
    });

    return res.code(200).send({
      address,
    });
  } catch (err) {
    return res.code(500).send({
      message: "Internal server error",
      error: true,
      success: false,
    });
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
      userAuth ;
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
      SSN: userAuth.user.SSN,
    };
    const token = req.jwt.sign(payload);

    const newSession = new Session({
      user: userAuth.user.id,
      token,
      status: "Active",
      expiryDate: new Date(Date.now() + 1000 * 60 * 60),
    });

    await db.persistAndFlush(newSession);

    reply.setCookie("access_token", token, {
      path: "/",
      httpOnly: true,
      secure: true,
    });
    return reply.code(200).send({ accessToken: token });
  } catch (err) {
    console.log("Error in login", err);
    return reply.code(500).send({ message: "Internal Server Error" });
  }
}

export async function addUserAddress(
  req: FastifyRequest<{
    Body: UserAddressInput;
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  const db = (await initORM()).em.fork();
  const { homeAddress, city, state, zipCode } = req.body;
  const { id } = req.params;
  try {
    const user = await db.findOne(User, {
      id: id,
    });

    if (!user) {
      return reply.code(500).send({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    const newAddress = new Demographics({
      homeAddress,
      city,
      state,
      zipCode,
      country: "USA",
      user: user,
    });

    await db.persistAndFlush(newAddress);

    return reply.code(201).send({
      message: "Address added successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    console.log("Error in addUserAddress", err);
    return reply
      .code(500)
      .send({ message: "Internal Server Error", success: false, error: true });
  }
}

export async function getUsers(req: FastifyRequest, reply: FastifyReply) {
  try {
    const db = (await initORM()).em.fork();
    // perform a join with demographics
    // Assuming User has a relation to Demographics

    const users = await db.find(User, {});

    return reply.code(200).send(users);
  } catch (err) {
    console.log(err);
    return reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function logout(req: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("access_token");
  return reply.send({ message: "Logout successful" });
}
