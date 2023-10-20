import Card from "./components/Card";

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  company: string;
  salary?: number;
  working_hours: number;
  images?: string[];
  active?: boolean;
  publish_date?: Date;
  location: string;
  type: string;
}

const fetchAdvertisements = async (): Promise<Advertisement[] | null> => {
  try {
    const response = await fetch("http://localhost:8000/advertisements")

    if (response.status === 200) {
      const { data } = await response.json()
      return data
    }
    else {
      throw new Error("Failed to retrieve advertisements.")
    }
  } catch (error) {
    console.log(error)
  }

  return null;
}

export default async function Home() {
  const advertisements = await fetchAdvertisements()

  return (
    <main className="items-center justify-between align-middle">
      <div className="flex flex-col gap-8 mb-8">
        {/* {loading && (
          <div className="flex justify-center my-60">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )} */}

        {advertisements?.map((card: Advertisement) => {
          return (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              company={card.company}
              salary={card.salary}
              working_hours={card.working_hours}
              active={card.active}
              publish_date={card.publish_date}
              images={card.images}
              location={card.location}
              type={card.type}
            />
          );
        })}
      </div>
    </main>
  );
}
