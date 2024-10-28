import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {DiaryEntry, NewDiaryEntry, ValidationError, Visibility, Weather} from "./types.ts";
import {getEntries, createNewEntry} from "./services/entriesService.ts";
import axios from "axios";

function App() {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
        date: "",
        weather: Weather.Sunny,
        visibility: Visibility.Great,
        comment: ""
    });
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = await getEntries();
                setEntries(res);
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };

        fetchEntries();
    }, [])

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setNewEntry({
            ...newEntry,
            [name]: value
        })
    };

    const addNewEntry = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const res = await createNewEntry(newEntry);
            setEntries(entries.concat(res));
            setNewEntry({
                date: "",
                weather: Weather.Sunny,
                visibility: Visibility.Great,
                comment: ""
            });
        } catch (err) {
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(err)) {
                setError(`${err.response.statusText}. Missing data`);
                setTimeout(()=> {
                    setError('');
                }, 3000);
            }
        }
    }
    return (
        <>
            <h3>Diary Entries</h3>
            <h2 style={{backgroundColor: 'red', color: 'white'}}>{error}</h2>
            <div>
                <form onSubmit={addNewEntry}>
                    <input
                        name="date"
                        placeholder="date"
                        value={newEntry.date}
                        onChange={handleChange}
                    />
                    <select
                        name="visibility"
                        value={newEntry.visibility}
                        onChange={handleChange}
                    >
                        <option value={Visibility.Great}>Great</option>
                        <option value={Visibility.Good}>Good</option>
                        <option value={Visibility.Ok}>Ok</option>
                        <option value={Visibility.Poor}>Poor</option>
                    </select>
                    <select
                        name="weather"
                        value={newEntry.weather}
                        onChange={handleChange}
                    >
                        <option value={Weather.Sunny}>Sunny</option>
                        <option value={Weather.Rainy}>Rainy</option>
                        <option value={Weather.Cloudy}>Cloudy</option>
                        <option value={Weather.Stormy}>Stormy</option>
                        <option value={Weather.Windy}>Windy</option>
                    </select>
                    <input
                        name="comment"
                        placeholder="comment"
                        value={newEntry.comment}
                        onChange={handleChange}
                    />
                    <button type="submit">add</button>
                </form>
            </div>
            {entries.map(entry => (
                <div key={entry.id}>
                    <h4>{entry.date}</h4>
                    <p>Weather: {entry.weather}</p>
                    <p>Visibility: {entry.visibility}</p>
                    {entry.comment && <p>Comment: {entry.comment}</p>}
                    <hr/>
                </div>
            ))}
        </>
    )
}

export default App