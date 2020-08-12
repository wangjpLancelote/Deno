const appState = {
  title: {
    text: 'title',
    color: 'red'
  },
  content: {
    text: 'content',
    color: 'blue'
  }
}

function renderApp (newAppState, oldAppState = {}) {
  if (newAppState === oldAppState) return; //数据未变化
  renderTitle(newAppState.title, oldAppState.title);
  renderContent(newAppState.content, oldAppState.content);
}

function renderTitle (newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return; //数据没变化
  const titleDOM = document.getElementById("title");
  titleDOM.innerHTML = newTitle.text;
  titleDOM.style.color = newTitle.color;
}

function renderContent (newContent, oldContent = {}) {
  if (newContent === oldContent) return;
  const contentDOM = document.getElementById("content");
  contentDOM.innerHTML = newContent.text;
  contentDOM.style.color = newContent.color;
}

function dispatch (state, action) {
  if (!state) {
    return {
      title: {
        text: 'title',
        color: 'red'
      },
      content: {
        text: 'content',
        color: 'blue'
      }
    }
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state, //每次修改都不改变原对象的数据
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state;
  }
}

/**
 * 这里的stateChanger 就是被称之为reducer的函数,reducer是一个约定俗成的写法。reducer是一个纯函数(dispatch)  作用仅仅是初始化和计算新的state.
 * @param {function} stateChanger => reducer
 */
function createStore (reducer) {
  let state = null; //不再从外部传入state，初始化为null
  const listeners = [];
  const subscribe = (listener) => listeners.push(listener);
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action); //返回对象state
    listeners.forEach(listener => listener())
  }
  dispatch({}); //手动调用一次dispatch，为state赋值,初始化内部数据
  return { getState, dispatch, subscribe }
}

const store = createStore(appState, dispatch);
let oldState = store.getState();
store.subscribe(() => {
  const newState = store.getState()
  renderApp(newState, oldState)
  oldState = newState;
})
renderApp(store.getState());

store.dispatch({ type: 'UPDATE_TITLE_TEXT', 'text': 'titleRefresh1' })
store.dispatch({ type: 'UPDATE_TITLE_COLOR', 'color': 'blue' })


// renderApp(store.getState());