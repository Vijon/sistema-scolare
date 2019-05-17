import messages from "./messages/messages.service";
import users from "./users/users.service";
import groups from "./groups/groups.service";
import editor from "./editor/editor.service";

export default function(app) {
  app.configure(messages);
  app.configure(users);
  app.configure(groups);
  app.configure(editor);
}
