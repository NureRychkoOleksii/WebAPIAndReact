import React, {Component, useState, useEffect} from "react";

function Home()
{
    const [values, setValues] = useState([]);
    const forceUpdate = useForceUpdate();
    useEffect( () => {
        fetch(process.env["REACT_APP_API"] + "/api/department")
            .then((res) => res.json())
            .then((data) => setValues([...data]));
    },[]);
    return (
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
                        <button className="edit">Edit</button>
                        <button className="delete" onClick={async () => {
                            const id = el.Id
                            await deleteOnClick(el.Id);
                            setValues(values.filter(el => el.Id != id))
                        }
                        }>Delete</button>
                    </th>
                </tr>
            )}
        </table>
    );
}

async function deleteOnClick(id)
{
   await fetch(process.env["REACT_APP_API"] + `/api/Department?id=${id}`, {
        method:'DELETE'
    })
}

function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

export default Home;