async function getISSMembers() {
    const MEMBER_API_URL = "http://api.open-notify.org/astros.json";
    const response = await fetch(MEMBER_API_URL);
    const data = await response.json();
    return data.people.filter(member => member.craft === "ISS");
}

async function displayISSMembers() {
    const members = await getISSMembers();
    const tableBody = document.querySelector("#iss-members tbody");
    tableBody.innerHTML = "";
    members.forEach(member => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = member.name;
    });
}


displayISSMembers();