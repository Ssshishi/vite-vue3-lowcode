type SimplyListener = () => void;

export function createEvent() {
  const listeners: SimplyListener[] = [];

  return {
    // 监听
    on: (cb: SimplyListener) => {
      listeners.push(cb);
    },

    // 卸载
    off: (cb: SimplyListener) => {
      const index = listeners.indexOf(cb);
      if (index > -1) listeners.splice(index, 1);
    },

    // 触发
    emit: () => {
      listeners.forEach((item) => item());
    },
  };
}
