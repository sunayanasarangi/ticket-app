import TicketCard from "./(components)/TicketCard";

//export const dynamic = "force-dynamic";
//export const fetchCache = "force-no-store";

const getTickets = async () => {
  try {
    //const res = await fetch("http://localhost:3000/api/Tickets", {
    const res = await fetch(
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/Tickets`,
      {
        cache: "no-store",
      }
    );

    // check if the response was successful
    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.log("Failed to get tickets", error);
  }
};
const Dashboard = async () => {
  const { tickets } = await getTickets();
  console.log("Is it failing here?");
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div kex={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
