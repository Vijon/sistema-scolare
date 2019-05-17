const { BadRequest } = require('@feathersjs/errors');

export default function() {
  return async context => {
    const { data } = context;

    // Check if there is `text` property
    if (!data.target_id) {
      throw new BadRequest("No target user id provided");
    }

    // Check if it is a string and not just whitespace
    if (typeof data.text !== "string" || data.text.trim() === "") {
      throw new BadRequest("Message text is invalid");
    }

    context.data = {
      text: data.text.toString()
    };

    return context;
  };
}
