import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Euro, SearchX } from "lucide-react";
//import { isApiClientError, useErrorHandler } from "@/api/error";
import { Button } from "@/components/ui/button";
//import { getAdverts } from "./service";
import { filterAdverts } from "./filters";
import FiltersInputs from "./components/filters-inputs";
import { AdvertCard } from "./components/advert-card";
import type { Filters } from "./types";
import { useAppDispatch, useAppSelector } from "@/store";
import { advertsLoaded } from "@/store/actions";
import { getAdvertsSelector, getUi } from "@/store/selectors";

function NoAdverts() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 text-center">
      <div className="bg-primary/10 rounded-full p-6">
        <Euro className="stroke-primary h-12 w-12" />
      </div>
      <div className="max-w-md space-y-2">
        <h2 className="text-2xl font-semibold">No adverts yet</h2>
        <p className="text-muted-foreground">
          Get started by creating your first advert. It's quick and easy!
        </p>
      </div>
      <Button asChild>
        <Link to="new">Create First Advert</Link>
      </Button>
    </div>
  );
}

function NoMatches() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 text-center">
      <div className="bg-primary/10 rounded-full p-6">
        <SearchX className="stroke-primary h-12 w-12" />
      </div>
      <div className="max-w-md space-y-2">
        <h2 className="text-2xl font-semibold">No matches found</h2>
        <p className="text-muted-foreground">
          Try adjusting your filters or search criteria to find what you're
          looking for
        </p>
      </div>
    </div>
  );
}

export default function AdvertsPage() {
  const navigate = useNavigate();
  //const [adverts, setAdverts] = useState<Advert[] | null>(null);
  const adverts = useAppSelector(getAdvertsSelector);
  const dispatch = useAppDispatch();
  const { pending, error} = useAppSelector(getUi);
  //const [isLoading, setIsLoading] = useState(false);
  //const [, setError] = useState<null>(null);
  const [filters, setFilters] = useState<Filters | null>(null);

  useEffect(() => {
    async function loadAdverts() {
      await dispatch(advertsLoaded())
      //try {
        //setIsLoading(true);
        //const adverts = await getAdverts();
        //setAdverts(adverts);
        //dispatch(AdvertsLoadedFulfilled(adverts))

      //} catch (error) {
        //if (isApiClientError(error)) {
          //if (error.code === "UNAUTHORIZED") {
           // return navigate("/login");
          //}
        //}
        //setError(() => {
          //throw error;
       // });
      //} finally {
        //setIsLoading(false);
      //}
    }
    loadAdverts();
  }, [dispatch, navigate]);

  if (!adverts || pending) {
    return "Loading....";
  }

  // Si hay un error, lo mostramos
  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error.message || "An unexpected error occurred"}</p>
      </div>
    );
  }

  if (!adverts.length) {
    return <NoAdverts />;
  }

  const prices = adverts.map((advert) => advert.price);
  const filteredAdverts = filterAdverts(adverts, filters);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl">Adverts (filtered by)</h1>
      </div>
      <FiltersInputs
        pricesRange={[Math.min(...prices), Math.max(...prices)]}
        onChange={setFilters}
      />
      {filteredAdverts.length === 0 ? (
        <NoMatches />
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAdverts.map((advert, index) => (    
            <li key={`${advert.id}-${index}`}>
            {/*<li key={advert.id}>*/}
              <Link to={advert.id}>
              {/*<Link to={advert.id.toString()}>*/}
                <AdvertCard advert={advert} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

//<li key={`${advert.id}-${index}`}> utilizmo el index para asegurarnos que las claves sean unicas para cada elemento de la lista que se renderiza