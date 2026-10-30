import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COULEURS = {
    "A Faire": "#f59e0b",
    "En Cours": "#f63b41",
    "Termine": "#22c55e",
};
const aujourdhui = () => new Date().toLocaleDateString("en-CA");

export const GestionTache = () => {
    const [tache, setTache] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [statut, setStatut] = useState("A Faire");
    const [search, setSearch] = useState("");

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
            setTaches(taches.map((t, i) => (i === indexModif ? nouvelle : t)));
        } else {
            setTaches([...taches, nouvelle]);
        }

        viderFormulaire();
    };

    const modifierTache = (index) => {
        const t = taches[index];
        setTache(t.text);
        setDateDebut(t.dateDebut);
        setDateFin(t.dateFin);
        setStatut(t.statut);
        setIndexModif(index);
    };

    const supprimerTache = (index) => {
        setTaches(taches.filter((_, i) => i !== index));
        if (indexModif === index) viderFormulaire();
    };

    const estEnRetard = (t) =>
        t.dateFin !== "" && t.dateFin < aujourdhui() && t.statut !== "Termine";

    const tachesFiltrees = taches
        .map((t, index) => ({ ...t, index }))
        .filter((t) => t.text.toLowerCase().includes(search.toLowerCase().trim()));

    const dataPie = ["A Faire", "En Cours", "Termine"]
        .map((s) => ({
            name: s,
            value: taches.filter((t) => t.statut === s).length,
        }))
        .filter((d) => d.value > 0);

    const nombreTotal = taches.length;
    const nombreRetard = taches.filter(estEnRetard).length;
    const rechercheActive = search.trim() !== "";

    const boxStyle = {
        border: "1px solid #999",
        borderRadius: 8,
        padding: 16,
        minWidth: 200,
    };

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
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

            <input
                type="search"
                placeholder="Type your search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: 320, marginBottom: 12 }}
            />

            {rechercheActive && (
                <p>
                    <b>{tachesFiltrees.length}</b> tache(s) trouvee(s)
                </p>
            )}

            <table
                border="1"
                cellPadding="8"
                style={{ margin: "0 auto", borderCollapse: "collapse", width: "100%" }}
            >
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
                    {tachesFiltrees.length === 0 && (
                        <tr>
                            <td colSpan="5">
                                {taches.length === 0 ? "Aucune tache" : "Aucun resultat"}
                            </td>
                        </tr>
                    )}

                    {tachesFiltrees.map((t) => (
                        <tr key={t.index}>
                            <td style={{ textDecoration: t.statut === "Termine" ? "line-through" : "none" }}>
                                {t.text}
                            </td>
                            <td>{t.dateDebut || "-"}</td>
                            <td style={{ color: estEnRetard(t) ? "#dc2626" : "inherit", fontWeight: estEnRetard(t) ? "bold" : "normal" }}>
                                {t.dateFin || "-"}
                            </td>
                            <td>{t.statut}</td>
                            <td>
                                <button onClick={() => modifierTache(t.index)}> Modifier</button>{" "}
                                <button onClick={() => supprimerTache(t.index)}> Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 30,
                    marginTop: 30,
                }}
            >
                {taches.length > 0 && (
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
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={boxStyle}>
                        <h3 style={{ marginTop: 0 }}>Number of Tasks</h3>
                        <p>
                            Total : <b>{nombreTotal}</b>
                        </p>
                        <p style={{ marginBottom: 0 }}>
                            Resultat recherche : <b>{rechercheActive ? tachesFiltrees.length : "-"}</b>
                        </p>
                    </div>

                    <div style={boxStyle}>
                        <h3 style={{ marginTop: 0 }}>Tasks retard</h3>
                        <p style={{ margin: 0, fontSize: 24, color: nombreRetard > 0 ? "#dc2626" : "inherit" }}>
                            <b>{nombreRetard}</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};