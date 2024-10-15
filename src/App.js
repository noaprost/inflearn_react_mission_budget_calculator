import "./App.css";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";

function App() {
  const [moneyList, setMoneyList] = useState([]);
  const [category, setCategory] = useState("");
  const [money, setMoney] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [totalMoney, setTotalMoney] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category.trim()) {
      alert("카테고리를 입력해주세요.");
      return;
    }
    if (!money || isNaN(parseFloat(money)) || parseFloat(money) <= 0) {
      alert("유효한 비용을 입력해주세요.");
      return;
    }

    if (isEditing) {
      const updatedList = moneyList.map((item, idx) =>
        idx === editIndex ? { category, money: parseFloat(money) } : item
      );
      setMoneyList(updatedList);
      setIsEditing(false);
      setEditIndex(null);

      setIsModified(true);

      setTimeout(() => {
        setIsModified(false);
      }, 2000);

      updateTotalMoney(updatedList);
    } else {
      const updatedList = [
        ...moneyList,
        {
          category,
          money: parseFloat(money),
        },
      ];
      setMoneyList(updatedList);

      setIsCreated(true);

      setTimeout(() => {
        setIsCreated(false);
      }, 2000);

      updateTotalMoney(updatedList);
    }

    setCategory("");
    setMoney("");
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleMoneyChange = (e) => {
    setMoney(e.target.value);
  };

  const handleItemDeleteClick = (idxToDelete) => {
    const updatedList = moneyList.filter((_, idx) => idx !== idxToDelete);
    setMoneyList(updatedList);

    setIsDeleted(true);

    setTimeout(() => {
      setIsDeleted(false);
    }, 2000);

    updateTotalMoney(updatedList);
  };

  const handleListDeleteClick = () => {
    setMoneyList([]);

    setIsDeleted(true);

    setTimeout(() => {
      setIsDeleted(false);
    }, 2000);

    setTotalMoney(0);
  };

  const handleItemModifyClick = (idxToModify) => {
    const itemToModify = moneyList[idxToModify];
    setCategory(itemToModify.category);
    setMoney(itemToModify.money);
    setIsEditing(true);
    setEditIndex(idxToModify);
  };

  const updateTotalMoney = (updatedList) => {
    const total = updatedList.reduce((sum, item) => sum + item.money, 0);
    setTotalMoney(total);
  };

  return (
    <>
      {isCreated && <p className="created">아이템이 생성되었습니다.</p>}
      {isDeleted && <p className="deleted">아이템이 삭제되었습니다.</p>}
      {isModified && <p className="modified">아이템이 수정되었습니다.</p>}

      <h1 className="title">예산 계산기</h1>
      <div className="info">
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="category">지출 항목</label>
          <input
            type="text"
            id="category"
            value={category}
            placeholder="예)렌트비"
            onChange={handleCategoryChange}
          ></input>
          <label htmlFor="money" placeholder="0">
            비용
          </label>
          <input
            type="number"
            id="money"
            onChange={handleMoneyChange}
            value={money}
          ></input>
          <button type="submit" className="submit_btn">
            <p>제출</p>
            <FaPaperPlane />
          </button>
        </form>
        <div className="list_main_container">
          <p className="list_title">지출 목록</p>
          <div className="list_container">
            {moneyList.map((item, idx) => (
              <li key={idx} className="list_item">
                <p>{item.category}</p>
                <p>{item.money}</p>
                <div className="button_container">
                  <button
                    className="modify"
                    onClick={() => handleItemModifyClick(idx)}
                  >
                    <FaPen />
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleItemDeleteClick(idx)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </div>
          <button className="list_delete_btn" onClick={handleListDeleteClick}>
            <p>목록 지우기</p>
            <FaTrash />
          </button>
        </div>
      </div>
      <h2 className="total_money">
        총 지출 : <span>{totalMoney}</span>원
      </h2>
    </>
  );
}

export default App;
