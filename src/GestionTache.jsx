import { useState } from "react";

export const GestionTache = () => {
    const [inputValue, setInputValue] = useState("");
    const [dateValue, setdateValue] = useState("");
    const [tache, setTache] = useState([]);
    const [indexModif, setIndexModif] = useState(null); 
    const [searchValue, setsearchValue]= useState("");

    const AjouterBtn = () => {
        if (inputValue.trim() === "") {
            alert("Veuillez saisir une tache!");
            return;
        }

        if (indexModif !== null) {
            setTache(
                tache.map((t, i) =>
                    i === indexModif
                        ? { ...t, text: inputValue.trim(), duree: dateValue }
                        : t
                )
            );
            setIndexModif(null);
        } else {
            const nouvelleTache = {
                text: inputValue.trim(),
                duree: dateValue,
                statut: "A Faire",
            };
            setTache([...tache, nouvelleTache]);
        }

        setInputValue("");   // katkhwi linput
        setdateValue("");    // katkhwi la date
    };

    // n3emro input bach nbdlo tache
    const modifierTache = (index) => {
        setInputValue(tache[index].text);
        setdateValue(tache[index].duree);
        setIndexModif(index);
    };

    // bdl lvalue dyal kola statut
    const changerStatut = (index, nouveauStatut) => {
        setTache(
            tache.map((t, i) =>
                i === index ? { ...t, statut: nouveauStatut } : t
            )
        );
    };

    const suppTache = (index) => {
        setTache(tache.filter((t, i) => i !== index));
        setIndexModif(null);
        setInputValue("");
        setdateValue("");
    };

    return (
        <div className="container">
            <h1>Gestion des Taches</h1>

            <div className="input-box">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && AjouterBtn()}
                />
                <input
                    type="date"
                    value={dateValue}
                    max="2100-12-31"
                    onChange={(e) => setdateValue(e.target.value)}
                />
                 <select value={t.statut} onChange={(e) => changerStatut(index, e.target.value)}>
                        <option value="A Faire">A Faire</option>
                        <option value="En Cours">En Cours</option>
                        <option value="Termine">Termine</option>
                </select>
                <input type="text" value={searchValue}/>search
                <button onClick={AjouterBtn}>
                    {indexModif !== null ? "Enregistrer" : "Ajouter"}
                </button>
            </div>

            <table border="1">
                <thead>
                    <tr>
                        <th>Tache</th>
                        <th>Duree</th>
                        <th>Statut</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tache.map((t, index) => (
                        <tr key={index}>
                            <td
                                style={{
                                    textDecoration:
                                        t.statut === "Termine" ? "line-through" : "none",
                                }}
                            >
                                {t.text}
                            </td>
                            <td>{t.duree || "-"}</td>
                            <td>
                                <select
                                    value={t.statut}
                                    onChange={(e) => changerStatut(index, e.target.value)}
                                >
                                    <option value="A Faire">A Faire</option>
                                    <option value="En Cours">En Cours</option>
                                    <option value="Termine">Termine</option>
                                </select>
                            </td>
                            <td>
                                <button className="btn" onClick={() => modifierTache(index)}>
                                    Modifier
                                </button>
                                <button className="btn" onClick={() => suppTache(index)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};