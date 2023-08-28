import React, { useState } from 'react';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/fa';
import { styled, css } from 'styled-components';

const TodoListItem = ({ todo, onUpdate, onRemove }) => {
  const { id, title, content } = todo;
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(todo || { id: '', text: '', content: '' });

  /**
   *   const onChange = (e) => {
    setValue({ ...value, title: e.target.value, content: e.target.value });
  }; -> 이렇게 하면 제목, 본문이 동시에 수정되므로 올바르지 않음.

  const onChangeTitle = (e) => {
    setValue({ ...value, title: e.target.value });
  }; -> onChange를 여러개 만들어 구현하는 방법.

  const onChangeContent = (e) => {
    setValue({ ...value, content: e.target.value });
  }; -> onChange를 여러개 만들어 구현하는 방법.
   */

  // console.log(value);

  /**
   *
   * input이 여러개일 때 상태 관리하는 방법
   *
   * 단순히 useState를 여러번 사용하여 onChange를 여러개 만들어 구현하는 방법은 그렇게 좋은 방법이 아님. -> useState가 객체를 관리하도록 하는 것.
   * input에 name props를 설정하고, 이벤트 발생시 이 값을 참조하도록
   * useState가 그냥 문자열 값을 관리하는 것을 넘어서 여러개의 문자열을 가지고 있는 객체형을 관리하도록 해주면 된다.
   * '비구조화 할당'을 통해 추출하는 방법. const {text, name} = e.target;
   * 기존 input 객체를 복사한 뒤에 특정 값만 덮어씌운 상태로 설정해주어야 함 -> 리액트 상태(state)에서는 반드시 이렇게 해주어야함!!
   * ...스프레드 문법 -> 객체 내용을 모두 '펼쳐서' 기존 객체를 복사해준다. -> 이러한 작업을 '불변성을 지킨다'라고 한다.
   * 리액트에서는 불변성을 지켜주어야만 컴포넌트 업데이트 성능 최적화를 할 수 있고, 리액트 컴포넌트에서 상태가 업데이트 되었음을 갑지하여 이에 따라 필요한 리렌더링이 진행된다.
   */
  const onChange = (e) => {
    // input값 변화 감지
    const text = e.target.value;
    const name = e.target.name;

    setValue({ ...value, [name]: text });
    // 기존 value 객체 복사한 뒤 name이라는 키를 가진 값을 text로 설정한다는 의미.
  };

  return (
    <div>
      {editMode ? (
        <div>
          <ul>
            <li key={todo.id}>
              <input
                value={value.title}
                name='title'
                type='text'
                onChange={onChange}
                autoFocus
              />
              <input
                value={value.content}
                name='content'
                type='text'
                onChange={onChange}
                autoFocus
              />
            </li>
            <button
              onClick={() => {
                onUpdate(value);
                setEditMode(false);
              }}
            >
              수정완료
            </button>
          </ul>
        </div>
      ) : (
        <div>
          <TodoListItemContainer>
            <input
              type='text'
              // name='title'
              value={title}
              onChange={onChange}
            />
            <input
              type='text'
              // name='content'
              value={content}
              onChange={onChange}
            />
            <button onClick={() => setEditMode(true)}>
              수정{/* <AiOutlineEdit /> */}
            </button>

            <div onClick={() => onRemove(id)}>
              <MdRemoveCircleOutline />
            </div>
          </TodoListItemContainer>
        </div>
      )}
    </div>
  );
};

export default TodoListItem;

const TodoListItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px;
`;

const TodoListItemContent = styled(TodoListItemContainer)``;
