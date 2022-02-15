import React from 'react'


function TableObject(value) {
    const [data, setData] = React.useState([value]);

    return <div contentEditable={true} onChange={(e) => setData(e.target.value)}>
        <table>
            <thead>

            </thead>
            <tbody>
                {
                    data.map(() =>
                        <tr>
                            <td>123</td>
                            <td>321</td>
                            <td>123</td>
                            <td>123</td>
                        </tr>
                    )
                }
            </tbody>
        </table>

    </div>
}

export default TableObject;
