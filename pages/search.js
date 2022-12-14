import { useRouter } from "next/dist/client/router";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({ searchResults }) {
const router = useRouter();
const { location, startDate, endDate, noOfGuests } = router.query;
const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
const range = `${formattedStartDate} - ${formattedEndDate}`;

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${noOfGuests}`}/>
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ stays - {range} - for {noOfGuests} guests</p>
                    <h1 className="text-3xl mb-6 font-semibold mt-2">Stays in {location}</h1>
                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <button className="button">Cancellation flexibility</button>
                        <button className="button">Type of Place</button>
                        <button className="button">Price</button>
                        <button className="button">More Filters</button>
                    </div>
                    <div className="flex flex-col">
                    {searchResults?.map(({ img, location, title, description, star, price, total }) => (
                        <InfoCard 
                        img={img}
                        location={location}
                        title={title}
                        description={description}
                        star={star}
                        price={price}
                        total={total}
                        key={img}
                        />
                    ))}
                    </div>
                </section>
                <section className="hidden xl:inline-flex xl:min-w-[600px]">
                    <Map searchResults={searchResults}/>
                </section>
            </main>
        </div>
    )
}

export default Search;

export async function getServerSideProps() {
    const searchResults = await fetch("https://links.papareact.com/isz").then(res => res.json());

    return {
        props: {
            searchResults,
        }
    }
}
