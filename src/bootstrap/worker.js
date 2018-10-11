// add project
global.registerWs = async nsp => {
  const message = {
    open: "/websocket/open",
    message: "/websocket/message"
  };
  const websocket = think.app.websocket;
  const sc = websocket.io.of(nsp);
  websocket.registerSocket(sc, message);
};

global.encodeForHTML = string => {
  var htmlEscapeMap = {
    "&": "&amp;", // & in escaped code
    "<": "&lt;", // DEC=> &#60; HEX=> &#x3c; Entity=> &lt;
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;", // &apos; 不推荐，因为它不在HTML规范中
    "/": "&#x2F;" // 闭合标签
  };
  var htmlEscapeChars = /[&<>"'\/]/g;
  return ("" + string).replace(htmlEscapeChars, function(match) {
    return htmlEscapeMap[match];
  });
};

think.beforeStartServer(async () => {
  const project = await think.model("project").select();
  const messages = project.map(item => {
    return {
      namespace: item.name,
      open: "/websocket/open",
      message: "/websocket/message"
    };
  });
  think.config("websocket.socketio.messages", messages);
});
