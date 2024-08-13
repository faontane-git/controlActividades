// styles.js
import styled from 'styled-components';
import ReactModal from 'react-modal';

const styles = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    min-height: 100vh;
    padding-bottom: 100px; 
    `,
  Header: styled.h1`
    color: #333;
    margin-bottom: 20px;
  `,
  MonthSelect: styled.select`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
  `,
  ActivityInputWrapper: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  `,
  Input: styled.input`
    padding: 10px;
    width: 300px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  `,
  Button: styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  `,
  ActivityListWrapper: styled.div`
    width: 100%;
    max-width: 800px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  `,
  ActivityTable: styled.table`
    width: 100%;
    border-collapse: collapse;
  `,
  ActivityTableHead: styled.thead`
    background-color: #007bff;
    color: white;
  `,
  ActivityTableBody: styled.tbody``,
  ActivityTableRow: styled.tr``,
  ActivityTableHeader: styled.th`
    padding: 15px;
  `,
  ActivityTableCell: styled.td`
    padding: 15px;
  `,
  ActivityDate: styled.strong`
    color: #007bff;
    font-weight: bold;
  `,
  DeleteButton: styled.button`
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #c82333;
    }
  `,
  ModifyButton: styled.button`
    padding: 10px 20px;
    background-color: #FFC107;  
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #FFA000;
    }
  `,
  Checkbox: styled.input`
    margin-right: 10px;
  `,
  CompleteButton: styled.button`
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #218838;
    }
  `,
  ModalWrapper: styled(ReactModal)`
    position: fixed;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    width: 400px;
    max-width: 90%;
  `,
  MonthSelectWrapper: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
  `,
  ModalHeader: styled.h2`
    margin-top: 0;
  `,
  ModalButton: styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;

    &:hover {
      background-color: #0056b3;
    }
  `,
  CloseButton: styled.button`
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;

    &:hover {
      background-color: #c82333;
    }
  `,
  FilterSelect: styled.select`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `,
  GenerateExcelButton: styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  `,
  FilterSelectWrapper: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 20px 0;
  `,
  Footer: styled.div`
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  position: fixed;
  width: 100%;
  bottom: 0;
`,
};

export default styles;
