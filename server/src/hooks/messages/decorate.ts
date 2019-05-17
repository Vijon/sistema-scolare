export default function() {
  return async context => {
    const { app, method, result, params } = context;
    let messages = method === "find" ? result.data : [result];
    messages = messages.map( m => ({
      id: m.id,
      text: m.text,
      position: m.position,
      createdAt: m.createdAt,
      sender: m['user.name'] // wtf ?
    }) );

    context.result = method === "find" ? messages : messages[0];

    return context;
  };
}
