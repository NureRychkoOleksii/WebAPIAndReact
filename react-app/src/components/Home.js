import React, {Component, useState, useEffect} from "react";

function Home()
{
    const [values, setValues] = useState([]);
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
                    <th>Edit/Delete</th>
                </tr>
            )}
        </table>
    );
}

export default Home;