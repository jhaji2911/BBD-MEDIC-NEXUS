# Entities of the Database

## Table 1: Users
- User ID (pk) - auto increment,
- First Name
- Last Name
- Role
- Created Date
- Updated Date

## Table 2: Auth
- ID (pk) - auto increment,
- User ID ( fk)
- Email (unique)
- Password (hashed)
- Salt (hashed)
- Created Date
- Updated Date

## Table 3: Session
- Session ID (pk) - auto increment,
- User ID  (fk)
- Token
- Status (Active/Inactive)
- Expiry Date
- Created Date

## Table 4: Job Description
- Job ID (pk) - auto increment,
- Title
- Description
- Location
- File Path (optional)
- File Text (optional)
- File Name (optional)
- Experience Required
- Posted By User ID (fk)
- Created Date
- Updated Date

## Table 5: Resume
- Resume ID (pk) - auto increment,
- File Path
- File Text
- File Name
- Uploaded By User ID  (fk)
- Created Date
- Updated Date

## Table 6: Profile
- Profile ID  (pk) - auto increment,
- Resume Id (fk)
- Profile JSON (stores all the profile data in JSON format)
- Created Date
- Updated Date


## Table 7: Profile Questionnaire
- Questionnaire ID (pk) - auto increment,
- Resume Id (fk)
- Profile Id (fk)
- QuestionAnswer JSON (stores all the question and answer data in JSON format)
- Created Date
- Updated Date


## Table 8: Questionnaire Master
- QuesMasterID   (pk) - auto increment,
- Question Text
- Answer Text
- Created Date
- Updated Date


## Table 9: Roles Master
- Role ID   (pk) - auto increment,
- Role Name
- Created Date
- Updated Date
