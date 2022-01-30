-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public."Locations"
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created_at timestamp with time zone DEFAULT now(),
    name text COLLATE pg_catalog."default",
    address text COLLATE pg_catalog."default",
    lat double precision,
    lon double precision,
    format text COLLATE pg_catalog."default",
    picture_url text COLLATE pg_catalog."default",
    orientation text COLLATE pg_catalog."default",
    CONSTRAINT "Locations_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Locations"
    OWNER to postgres;

GRANT ALL ON TABLE public."Locations" TO anon;

GRANT ALL ON TABLE public."Locations" TO authenticated;

GRANT ALL ON TABLE public."Locations" TO postgres;

GRANT ALL ON TABLE public."Locations" TO service_role;
