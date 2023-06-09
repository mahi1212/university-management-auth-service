/* 
    ! Service will not contain any request or response objects
    * it will contain only the business logic
*/

import config from '../../../config'
import ApiError from '../../../errors/ApiErrors'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'
/* 
    * auto generated incrementing id
    ! default password 
*/
const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()
  user.id = id

  if (!user.password) {
    user.password = config.default_user_password as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create User')
  }
  return createdUser
}

export const UserService = {
  createUser,
}
