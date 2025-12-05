"use client";
import CenterTitle from "@/components/ui/CenterTitle";
import { AppDispatch, RootState } from "@/store";
import { fetchNotes } from "@/store/features/notesSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Notes() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, error, loading } = useSelector(
    (state: RootState) => state.notes
  );
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  if (loading) {
    return <div className="p-8 container mx-auto">Loading brands...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-red-500 container mx-auto">Error: {error}</div>
    );
  }

  return (
    <div className="p-8 container mx-auto">
      {items.length === 0 ? (
        <p>No Notes found</p>
      ) : (
        <div className="">
          <CenterTitle title="Notes" />
          <div className="grid grid-cols-2 mt-8 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {items.map((note) => (
              <Link key={note.id} href={`notes/${note.name}`}>
                <div className="border rounded-lg p-4 hover:shadow-lg transition h-[300px] ">
                  <img
                    src={note.image}
                    alt={note.name}
                    className="  rounded mb-4 w-full  h-[200px] "
                  />
                  <h3 className="text-xl font-semibold">{note.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
