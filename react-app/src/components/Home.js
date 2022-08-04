import React, {useState, useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function Home()
{
    const [values, setValues] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editingDepartment, setDepartment] = useState({});
    const openModal = () => setVisible(true);
    const closeModal = () => setVisible(false);
    useEffect( () => {
        fetch(process.env["REACT_APP_API"] + "/api/department")
            .then((res) => res.json())
            .then((data) => setValues([...data]));
    },[]);
    return (
        <div>
        <table className="employees">
            <tr>
                <th>DepartmentId</th>
                <th>DepartmentName</th>
                <th>Options</th>
            </tr>
            {values.map(el =>
                <tr>
                    <th>{el.Id}</th>
                    <th>{el.Name}</th>
                    <th>
                        <button className="edit" onClick={() => {
                            setDepartment(el);
                            setVisible(true);
                        }}>
                            Edit
                        </button>
                        <button className="delete" onClick={async () => {
                            const id = el.Id;
                            await deleteOnClick(el.Id);
                            setValues(values.filter(el => el.Id !== id))
                        }
                        }>Delete</button>
                    </th>
                </tr>
            )}
        </table>
            <Modal show={visible} onHide={closeModal} animation={true} centered={true}>
                <Modal.Header>
                    <Modal.Title>Editing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Name" name="name" value = {editingDepartment.Name} onChange={(e) =>
                                setDepartment({
                                    Id: editingDepartment.Id,
                                    Name: e.target.value
                                })
                            }>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="success" onClick={async () => {
                        await updateOnClick(editingDepartment);
                        fetch(process.env["REACT_APP_API"] + "/api/department")
                            .then((res) => res.json())
                            .then((data) => setValues([...data]));
                    }}>Edit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

async function deleteOnClick(id)
{
   await fetch(process.env["REACT_APP_API"] + `/api/Department?id=${id}`, {
        method:'DELETE'
    });
}
async function updateOnClick(department)
{
    await fetch(process.env["REACT_APP_API"] + `/api/Department`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Id: department.Id, Name:department.Name})
    })
        .then(console.log);
}

export default Home;