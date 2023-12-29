import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    console.log("vercel url: ", process.env.NEXT_PUBLIC_VERCEL_URL);
    //const res = await fetch("http://localhost:3000/api/Tickets", {
    const res = await fetch(`https://${process.env.VERCEL_URL}/api/Tickets`, {
      cache: "no-store",
    });

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
