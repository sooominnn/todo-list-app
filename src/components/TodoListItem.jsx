import React, { useState } from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
  MdEdit,
} from 'react-icons/md';
// import cn from 'classnames';
import { AiOutlineEdit } from 'react-icons/fa';
import { styled, css } from 'styled-components';

const TodoListItem = ({ todo, onUpdate, onRemove, onToggle }) => {
  const { id, title, content, checked } = todo;
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(todo || { id: '', text: '', content: '' });
  const [borderColor, setBorderColor] = useState('green');

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
        <ul>
          <TodoListItemInput
            value={value.title}
            name='title'
            type='text'
            onChange={onChange}
            autoFocus
          />
          <TodoListItemInput
            value={value.content}
            name='content'
            type='text'
            onChange={onChange}
            autoFocus
          />
          <button
            onClick={() => {
              onUpdate(value);
              setEditMode(false);
            }}
          >
            완료
          </button>
        </ul>
      ) : (
        <TodoListItemContainer>
          <TodoListItemContainerCheckBox onClick={() => onToggle(id)}>
            {checked ? (
              <MdCheckBoxStyle>
                <MdCheckBox />{' '}
              </MdCheckBoxStyle>
            ) : (
              <MdCheckBoxOutlineBlank />
            )}
          </TodoListItemContainerCheckBox>
          <TodoListItemInput type='text' value={title} onChange={onChange} />
          <TodoListItemInput type='text' value={content} onChange={onChange} />
          <MdEditStyle onClick={() => setEditMode(true)}>
            <MdEdit />
          </MdEditStyle>
          <TodoListItemRemove>
            <MdRemoveCircleOutlineStyle onClick={() => onRemove(id)}>
              <MdRemoveCircleOutline />
            </MdRemoveCircleOutlineStyle>
          </TodoListItemRemove>
        </TodoListItemContainer>
      )}
    </div>
  );
};

export default TodoListItem;

const TodoListItemContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const TodoListItemContainerCheckBox = styled.div`
  cursor: pointer;
  flex: 1; // 차지할 수 있는 영역 모두 차지
  display: flex;
  align-items: center;
  svg {
    // 아이콘
    font-size: 1.5rem;
  }
`;

const TodoListItemRemove = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
`;

const TodoListItemInput = styled.input`
  background: none;
  outline: none;
  border: none;
  margin-right: 3rem;
  flex: 1;
  svg {
    color: #22b8cf;
  }
`;

const MdCheckBoxStyle = styled.div`
  color: #22b8cf;
`;

const MdEditStyle = styled.div`
  margin-left: 0.5rem;
`;

const MdRemoveCircleOutlineStyle = styled.div`
  margin-left: 0.5rem;
`;
