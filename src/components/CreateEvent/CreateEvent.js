import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { format } from "date-fns";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "./CreateEvent.module.css";

const EditEvent = ({ event, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(event);
  };

  const handleDelete = () => {
    onDelete(event);
  };

  return (
    <div className={styles["edit-event-container"]}>
      <button className={styles["edit-event-button"]} onClick={handleEdit}>
        <RiEdit2Line />
      </button>
      <button className={styles["delete-event-button"]} onClick={handleDelete}>
        <RiDeleteBinLine />
      </button>
    </div>
  );
};

const formatTimestamp = (timestamp) => {
  if (timestamp instanceof Date) {
    return timestamp.toLocaleString("hr-HR");
  } else if (
    timestamp &&
    timestamp.toDate &&
    typeof timestamp.toDate === "function"
  ) {
    return format(timestamp.toDate(), "dd/MM/yyyy, HH:mm");
  }
  return "";
};

const CreateEvent = ({ user }) => {
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventTimestamp, setEventTimestamp] = useState("");
  const [eventGenre, setEventGenre] = useState("");
  const [userEvents, setUserEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [startDate, setStartDate] = useState(""); //ss
  const [endDate, setEndDate] = useState("");
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventImage, setEventImage] = useState(null);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        if (user) {
          const eventsRef = collection(db, "events");
          const userEventsQuery = query(
            eventsRef,
            where("createdBy", "==", user.email)
          );
          const userEventsSnapshot = await getDocs(userEventsQuery);
          const userEventsData = userEventsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserEvents(userEventsData);
        }
      } catch (error) {
        console.error("Pogreška pri dohvaćanju događaja korisnika: ", error);
      }
    };

    fetchUserEvents();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleCreateEvent = async () => {
    try {
      // Provjeri jesu li sva polja ispunjena
      if (
        !eventName ||
        !eventLocation ||
        !eventPrice ||
        !eventTimestamp ||
        !eventGenre
      ) {
        window.alert("Please fill all fields before creating an event.");
        return;
      }

      const eventsRef = collection(db, "events");

      // Deklariraj addedEventId prije korištenja
      let addedEventId;

      const newEvent = {
        name: eventName,
        location: eventLocation,
        price: eventPrice,
        timestamp: eventTimestamp ? new Date(eventTimestamp) : null,
        genre: eventGenre,
        createdBy: user.email,
      };

      const addedEventRef = await addDoc(eventsRef, newEvent);

      // Dodijeli vrijednost addedEventId
      addedEventId = addedEventRef.id;

      const storageRef = ref(storage, `event_images/${addedEventId}`);
      if (eventImage) {
        const imageSnapshot = await uploadBytes(storageRef, eventImage);
        const imageUrl = await getDownloadURL(imageSnapshot.ref);
        newEvent.image = imageUrl;
      }

      const updatedEventRef = doc(db, "events", addedEventId);
      await updateDoc(updatedEventRef, newEvent);

      window.alert("Event created successfully!");

      // Ažuriraj lokalno stanje dodavanjem novog događaja
      setUserEvents((prevUserEvents) => [
        ...prevUserEvents,
        { id: addedEventId, ...newEvent },
      ]);

      // Resetiraj polja za unos
      setEventName("");
      setEventLocation("");
      setEventPrice("");
      setEventTimestamp("");
      setEventGenre("");
      setEventImage(null);
      setIsCreatingEvent(false);
    } catch (error) {
      console.error("Error creating event: ", error);
    }
  };

  const handleEditEvent = async () => {
    try {
      const eventRef = doc(db, "events", editingEvent.id);
      const updatedEvent = {
        name: eventName,
        location: eventLocation,
        price: eventPrice,
        ...(eventTimestamp ? { timestamp: new Date(eventTimestamp) } : {}),
        genre: eventGenre,
      };

      // Ako postoji odabrana nova slika, ažuriraj je u Firebase Storage
      if (eventImage) {
        const storageRef = ref(storage, `event_images/${editingEvent.id}`);
        await uploadBytes(storageRef, eventImage);
        const imageUrl = await getDownloadURL(storageRef);
        updatedEvent.image = imageUrl;
      }

      console.log("Updated Event Data:", updatedEvent);

      await updateDoc(eventRef, updatedEvent);

      // Ažuriraj lokalno stanje kako biste odmah vidjeli promjene
      setUserEvents((prevUserEvents) =>
        prevUserEvents.map((e) =>
          e.id === editingEvent.id ? { ...e, ...updatedEvent } : e
        )
      );

      window.alert("Event updated successfully!");

      setEventName("");
      setEventLocation("");
      setEventPrice("");
      setEventTimestamp("");
      setEventGenre("");
      setEditingEvent(null);
      setIsCreatingEvent(false);
    } catch (error) {
      console.error("Pogreška prilikom ažuriranja događaja: ", error);
    }
  };

  const handleDeleteEvent = async (event) => {
    try {
      const eventRef = doc(db, "events", event.id);
      await deleteDoc(eventRef);

      // Ažuriraj lokalno stanje kako bi se događaj odmah uklonio
      setUserEvents((prevUserEvents) =>
        prevUserEvents.filter((e) => e.id !== event.id)
      );

      window.alert("Event deleted successfully!");

      setEditingEvent(null);
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  const handleAddNewEvent = () => {
    setIsCreatingEvent(true);
    setEditingEvent(null);
  };
  
  const handleEdit = (event) => {
    setEventName(event.name || "");
    setEventLocation(event.location || "");
    setEventPrice(event.price || "");
    setEventTimestamp(
      event.timestamp instanceof Date || event.timestamp === null
        ? event.timestamp?.toISOString().split("Z")[0]
        : ""
    );
    setEventGenre(event.genre || "");
    setIsCreatingEvent(true);
    setEditingEvent(event);
  };

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  const filteredUserEvents = userEvents.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEvents = filteredUserEvents
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
        return (
          (a.timestamp && a.timestamp.toDate()) -
          (b.timestamp && b.timestamp.toDate())
        );
      } else if (sortOrder === "date-desc") {
        return (
          (b.timestamp && b.timestamp.toDate()) -
          (a.timestamp && a.timestamp.toDate())
        );
      }
    
      return 0;
    });

  return (
    <div className={styles["container"]}>
      {!isCreatingEvent ? (
        <>
          <div className={styles["filters-container"]}>
            <div className={styles["header-container"]}>
              <h2 className={styles["title"]}>Your Events</h2>
              <div
                className={styles["add-new-event-card"]}
                onClick={handleAddNewEvent}
              >
                <BsPlus size={52} />
              </div>
            </div>
            <label className={styles["label2"]}>
              <input
                type="text"
                placeholder="Search by event name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles["input"]}
              />
            </label>
            <div className={styles["select-filters"]}>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className={styles.FilterSelect}
              >
                <option value="">All Locations</option>
                {[
                  ...new Set(filteredUserEvents.map((event) => event.location)),
                ].map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className={styles["filter-select"]}
              >
                <option value="">All Genres</option>
                {[
                  ...new Set(filteredUserEvents.map((event) => event.genre)),
                ].map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>

              <div className={styles["date-filter-container"]}>
                <label className={styles["date-filter-label"]}>
                  Start Date:
                </label>
                <input
                  type="date"
                  placeholder="Start Date"
                  value={startDate ? startDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  className={styles["date-filter-input"]}
                />
              </div>

              <div className={styles["date-filter-container"]}>
                <label className={styles["date-filter-label"]}>End Date:</label>
                <input
                  type="date"
                  placeholder="End Date"
                  value={endDate ? endDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                  className={styles["date-filter-input"]}
                />
              </div>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={styles["filter-select"]}
              >
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
                <option value="date-asc">Date Ascending</option>
                <option value="date-desc">Date Descending</option>
              </select>
            </div>
          </div>
          <ul className={styles["event-list"]}>
            {sortedEvents.map((event) => (
              <li key={event.id} className={styles["event-item"]}>
                {event.image && (
                  <img
                    src={event.image}
                    alt={`Event: ${event.name}`}
                    className={styles["event-image"]}
                  />
                )}
                <div className={styles["event-info"]}>
                  <strong>Name:</strong> {event.name}
                  <br />
                  <strong>Location:</strong> {event.location}
                  <br />
                  <strong>Price:</strong> {event.price}
                  <br />
                  <strong>Timestamp:</strong> {formatTimestamp(event.timestamp)}
                  <br />
                  <br />
                  {event.genre && (
                    <div>
                      <strong>Genre:</strong> {event.genre}
                    </div>
                  )}
                  <div className={styles["edit-event-container"]}>
                    <button
                      className={styles["edit-event-button"]}
                      onClick={() => handleEdit(event)}
                    >
                      <RiEdit2Line />
                    </button>
                    <button
                      className={styles["delete-event-button"]}
                      onClick={() => handleDeleteEvent(event)}
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 className={styles["title-event"]}>
            {editingEvent ? "Edit Event" : "Create Event"}
          </h2>
          <label className={styles["label"]}>
            Event Name:
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className={styles["input"]}
            />
          </label>
          <label className={styles["label"]}>
            Event Location:
            <input
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className={styles["input"]}
            />
          </label>
          <label className={styles["label"]}>
            Event Price:
            <input
              type="text"
              value={eventPrice}
              onChange={(e) => setEventPrice(e.target.value)}
              className={styles["input"]}
            />
          </label>
          <label className={styles["label"]}>
            Event Timestamp:
            <input
              type="datetime-local"
              value={eventTimestamp}
              onChange={(e) => setEventTimestamp(e.target.value)}
              className={styles["input"]}
            />
          </label>
          <label className={styles["label"]}>
            Event Genre:
            <input
              type="text"
              value={eventGenre}
              onChange={(e) => setEventGenre(e.target.value)}
              className={styles["input"]}
            />
          </label>
          <label className={styles["label"]}>
            Event Image:
            <input
              type="file"
              onChange={(e) => setEventImage(e.target.files[0])}
              className={styles["input"]}
            />
          </label>
          {editingEvent ? (
            <button className={styles["button"]} onClick={handleEditEvent}>
              Save Changes
            </button>
          ) : (
            <button className={styles["button"]} onClick={handleCreateEvent}>
              Create Event
            </button>
          )}
          <button
            className={styles["cancel-button"]}
            onClick={() => setIsCreatingEvent(false)}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default CreateEvent;
