import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
const COULEURS = {
    "A Faire": "#f59e0b",
    "En Cours": "#f63b41",
    "Termine": "#22c55e",
};
export const GestionTache = () => {
    
    const [tache, setTache] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [statut, setStatut] = useState("A Faire");

    const [taches, setTaches] = useState([]);
    const [indexModif, setIndexModif] = useState(null);

    const viderFormulaire = () => {
        setTache("");
        setDateDebut("");
        setDateFin("");
        setStatut("A Faire");
        setIndexModif(null);
    };
    const handleSubmit = () => {
        if (tache.trim() === "") {
            alert("Veuillez saisir une tache!");
            return;
        }
        if (dateDebut && dateFin && dateFin < dateDebut) {
            alert("La date de fin doit etre apres la date de debut!");
            return;
        }

        const nouvelle = {
            text: tache.trim(),
            dateDebut,
            dateFin,
            statut,
        };

        if (indexModif !== null) {
            //kanbdlo la tache li f indexModif
            setTaches(taches.map((t, i) => (i === indexModif ? nouvelle : t)));
        } else {
            setTaches([...taches, nouvelle]);
        }

        viderFormulaire();
    };

    //kan3emro lformulaire b les valeurs dyal la tache
    const modifierTache = (index) => {
        const t = taches[index];
        setTache(t.text);
        setDateDebut(t.dateDebut);
        setDateFin(t.dateFin);
        setStatut(t.statut);
        setIndexModif(index);
    };

    const dataPie = ["A Faire", "En Cours", "Termine"]
    .map((s) => ({
        name: s,
        value: taches.filter((t) => t.statut === s).length,
    }))
    .filter((d) => d.value > 0);

    const supprimerTache = (index) => {
        setTaches(taches.filter((_, i) => i !== index));
        if (indexModif === index) viderFormulaire();
    };

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <h1>Gestion des Taches</h1>

<div
    style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: 320,
        margin: "0 auto 20px auto",
        textAlign: "left",
    }}
>
    <input
        type="text"
        placeholder="Tache"
        value={tache}
        onChange={(e) => setTache(e.target.value)}
    />

    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        Date debut
        <input
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
        />
    </label>

    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        Date fin
        <input
            type="date"
            value={dateFin}
            min={dateDebut}
            onChange={(e) => setDateFin(e.target.value)}
        />
    </label>

    <select value={statut} onChange={(e) => setStatut(e.target.value)}>
        <option value="A Faire">A Faire</option>
        <option value="En Cours">En Cours</option>
        <option value="Termine">Termine</option>
    </select>

    <button onClick={handleSubmit}>
        {indexModif !== null ? " Enregistrer" : " Ajouter"}
    </button>

    {indexModif !== null && (
        <button onClick={viderFormulaire}>Annuler</button>
    )}
</div>

            <table border="1" cellPadding="8" style={{ margin: "0 auto", borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th>Tache</th>
                        <th>Date debut</th>
                        <th>Date fin</th>
                        <th>Statut</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {taches.length === 0 && (
                        <tr>
                            <td colSpan="5">Aucune tache</td>
                        </tr>
                    )}

                    {taches.map((t, index) => (
                        <tr key={index}>
                            <td style={{ textDecoration: t.statut === "Termine" ? "line-through" : "none" }}>
                                {t.text}
                            </td>
                            <td>{t.dateDebut || "-"}</td>
                            <td>{t.dateFin || "-"}</td>
                            <td>{t.statut}</td>
                            <td>
                                <button onClick={() => modifierTache(index)}> Modifier</button>{" "}
                                <button onClick={() => supprimerTache(index)}> Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {taches.length > 0 && (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
        <PieChart width={350} height={300}>
            <Pie
                data={dataPie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
            >
                {dataPie.map((d) => (
                    <Cell key={d.name} fill={COULEURS[d.name]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    </div>
)}
        </div>
    );
};