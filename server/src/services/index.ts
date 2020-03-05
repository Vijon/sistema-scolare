import { Application } from '../declarations';
import messages from "./messages/messages.service";
import users from "./users/users.service";
import groups from "./groups/groups.service";
import editor from "./editor/editor.service";
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(messages);
  app.configure(users);
  app.configure(groups);
  app.configure(editor);
}
