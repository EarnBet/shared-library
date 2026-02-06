import { Test } from "@nestjs/testing";

import { SharedUsersModule } from "../../src/users/users-shared.module";
import { UserRepository } from "../../src/users/repositories/user.repository";

(async () => {
  const module = await Test.createTestingModule({
    imports: [SharedUsersModule],
  }).compile();

  const users = module.get(UserRepository);

  await users.clear();

  await users.register({
    username: "Sean",
    password: "",
    date_of_birth: "2020-12-20",
    ip: "",
    referral_code: "",
  });

  const user = await users.findBySimilarUsername("sean");

  console.log(user);

  process.exit();
})();
