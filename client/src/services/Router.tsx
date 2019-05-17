import { createBrowserHistory } from "history";

const history = createBrowserHistory({
  basename: "/",
});

const parseLocation = (location: any) => {
  const pts = location.pathname.split("/").filter((v: string) => v.length>0);
  return Object.assign( {}, location, {
    type: pts[0] || "index",
    id: pts[1]
  })
}

var listener: any;
var events = {} as any;
var current = parseLocation(history.location);
const route = {
  init() {
    this.trigger( current );

    listener = history.listen((location: any, action: any) => {
        location = parseLocation(location)
        if (current && location.pathname === current.pathname) {
          return;
        }
        this.trigger( location, action );
        current = parseLocation(location);
        // console.log(`The last navigation action was ${action}`)
    });
  },

  destroy() {
    listener();
  },

  trigger( location: any, action?: any ) {
    let type = location.type;
    if (events[type]) {
      events[type].forEach((e: any) => {
        e( location, action );
      });
    }
  },

  on( type: string, callback: Function ) {
    if (!events[type]) { events[type] = []; }
    events[type].push( callback );
    // if event is about current location, trigger immediatly
    if (type === current.type) {
      callback( current );
    }
  },

  goto(uri: string | any, replace?: boolean) {
    history[replace ? "replace" : "push"]( typeof uri === "string" ? `/${uri}` : uri);
  }
}

export {
  route
}