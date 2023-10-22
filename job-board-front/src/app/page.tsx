import Card from "./components/Card";

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  company: string;
  salary: number;
  workingHours: number;
  active: boolean;
  publishDate: Date;
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
        {advertisements?.map((ad: Advertisement) => {
          return (
            <Card
              key={ad.id}
              id={ad.id}
              title={ad.title}
              description={ad.description}
              company={ad.company}
              salary={ad.salary}
              workingHours={ad.workingHours}
              active={ad.active}
              publishDate={ad.publishDate}
              location={ad.location}
              type={ad.type}
            />
          );
        })}
      </div>
    </main>
  );
}
