import { BadRequest } from "@feathersjs/errors";
import { canAccess } from "../../models/user.model";

export default async function(app, params) {
  const { id } = params.route;
  const { name } = params.query;
  const auth = params.authenticated ? params.user : null;
  const target = await app.service("users").get(id, {
      forceName: true
  });

  // validation
  if (!name || name.length === 0) {
    throw new BadRequest("Name is invalid");
  }
  if (!auth) {
    throw new BadRequest("You're not authorized");
  }

  // if already unlocked
  if (canAccess(auth, target)) {
    return target;
  }

  // parse and update
  const heUnlocked = normalizeString(name) === normalizeString(target.name);
  if (!heUnlocked) {
    throw new BadRequest("Wrong name");
  }
  let newVal = auth.unlocked || [];
  newVal.push({
    target: target.id,
    at: Date.now()
  });
  await app.service("users").patch(auth.id, {
    unlocked: newVal
  });

  return target;
}

function normalizeString( text ) {
    return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}