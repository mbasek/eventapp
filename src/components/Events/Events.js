import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import styles from "./Events.module.css";
import { format } from "date-fns";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [allLocations, setAllLocations] = useState([]);
  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsRef = collection(db, "events");
        const snapshot = await getDocs(eventsRef);
        const eventsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);

        const locations = [
          ...new Set(eventsData.map((event) => event.location)),
        ];
        setAllLocations(locations);

        const genres = [...new Set(eventsData.map((event) => event.genre))];
        setAllGenres(genres);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchData();
  }, []);

  const filteredEvents = events
    .filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((event) =>
      selectedLocation
        ? event.location.toLowerCase() === selectedLocation.toLowerCase()
        : true
    )
    .filter((event) =>
      selectedGenre
        ? event.genre.toLowerCase() === selectedGenre.toLowerCase()
        : true
    )
    .filter((event) => {
      if (startDate && endDate) {
        return (
          event.timestamp?.toDate() >= startDate &&
          event.timestamp?.toDate() <= endDate
        );
      }
      return true;
    });

  const sortedEvents = filteredEvents.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "desc") {
      return b.name.localeCompare(a.name);
    } else if (sortOrder === "date-asc") {
      return a.timestamp?.toDate() - b.timestamp?.toDate();
    } else if (sortOrder === "date-desc") {
      return b.timestamp?.toDate() - a.timestamp?.toDate();
    }

    return 0;
  });

  return (
    <div className={styles["events-container"]}>
      <h2 className={styles["events-header"]}>Event List</h2>

      <div className={styles["filters-container"]}>
        <input
          className={styles["search-input"]}
          type="text"
          placeholder="Search by event name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={styles["select-filters"]}>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {allLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {allGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          <div className={styles["date-filter-container"]}>
            <label className={styles["date-filter-label"]}>Start Date:</label>
            <input
              className={styles["date-filter-input"]}
              type="date"
              placeholder="Start Date"
              value={startDate ? startDate.toISOString().split("T")[0] : ""}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </div>

          <div className={styles["date-filter-container"]}>
            <label className={styles["date-filter-label"]}>End Date:</label>
            <input
              className={styles["date-filter-input"]}
              type="date"
              placeholder="End Date"
              value={endDate ? endDate.toISOString().split("T")[0] : ""}
              onChange={(e) => setEndDate(new Date(e.target.value))}
            />
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort A-Z</option>
            <option value="desc">Sort Z-A</option>
            <option value="date-asc">Sort by Date Ascending</option>
            <option value="date-desc">Sort by Date Descending</option>
          </select>
        </div>
      </div>
      <div className={styles["event-list"]}>
        {sortedEvents.map((event) => (
          <div key={event.id} className={styles["event-card"]}>
            {event.image && (
              <img
                className={styles["event-image"]}
                src={event.image}
                alt={`Event: ${event.name}`}
              />
            )}
            <div className={styles["event-content"]}>
              <h3 className={styles["event-title"]}>{event.name}</h3>
              <div className={styles["event-details"]}>
                <div className={styles["event-detail"]}>
                  <strong>Location:</strong> {event.location}
                </div>
                <div className={styles["event-detail"]}>
                  <strong>Price:</strong> {event.price}
                  <strong> €</strong>
                </div>
                <div className={styles["event-detail"]}>
                  <strong>Timestamp:</strong>{" "}
                  {event.timestamp?.toDate() &&
                    format(event.timestamp.toDate(), "dd/MM/yyyy, HH:mm")}
                </div>
                {event.genre && (
                  <div className={styles["event-detail"]}>
                    <strong>Genre:</strong> {event.genre}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
