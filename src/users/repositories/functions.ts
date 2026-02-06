import { Raw } from "typeorm";

import emojiRegex from "emoji-regex";

import { escapeStringInput } from "../../database/functions";

export function whereClauseForSimilarUsername({
  columnName,
  username,
}: {
  columnName: string;
  username: string;
}) {
  return {
    [columnName]: Raw(
      () =>
        // need to use a raw query string, but we must escape the user input to prevent sql injection!!!
        `REGEXP_REPLACE( CONVERT( LOWER(${columnName}) USING utf8), '\\\\?', '')  = ${escapeStringInput(
          username.replace(emojiRegex(), "").toLowerCase()
        )}`
    ),
  };
}
