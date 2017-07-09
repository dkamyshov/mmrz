import * as React from 'react';

import {PENDING,CORRECT,INCORRECT} from '../helpers/constants';

const GameResultsTable = ({results}) => {
    return <table>
        <thead>
            <tr>
                <th>Слово</th>
                <th>Ваш вариант</th>
                <th>Верный вариант</th>
            </tr>
        </thead>

        <tbody>
            {
                results.map((_, i) => (
                    <tr key={i} style={{backgroundColor: _.status == CORRECT ? "#b4e391" : "#e39199"}}>
                        <td>{_.question}</td>
                        <td>{_.answer}</td>
                        <td>{_.correct}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>;
}

export default GameResultsTable;
