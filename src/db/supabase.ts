/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/Campaigns": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.Campaigns.id"];
          name?: parameters["rowFilter.Campaigns.name"];
          status?: parameters["rowFilter.Campaigns.status"];
          location_config?: parameters["rowFilter.Campaigns.location_config"];
          dueDate?: parameters["rowFilter.Campaigns.dueDate"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["Campaigns"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** Campaigns */
          Campaigns?: definitions["Campaigns"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.Campaigns.id"];
          name?: parameters["rowFilter.Campaigns.name"];
          status?: parameters["rowFilter.Campaigns.status"];
          location_config?: parameters["rowFilter.Campaigns.location_config"];
          dueDate?: parameters["rowFilter.Campaigns.dueDate"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.Campaigns.id"];
          name?: parameters["rowFilter.Campaigns.name"];
          status?: parameters["rowFilter.Campaigns.status"];
          location_config?: parameters["rowFilter.Campaigns.location_config"];
          dueDate?: parameters["rowFilter.Campaigns.dueDate"];
        };
        body: {
          /** Campaigns */
          Campaigns?: definitions["Campaigns"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/LocationScreens": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.LocationScreens.id"];
          location_id?: parameters["rowFilter.LocationScreens.location_id"];
          /** Identifies a screen, in case a location has multiple */
          order_id?: parameters["rowFilter.LocationScreens.order_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["LocationScreens"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** LocationScreens */
          LocationScreens?: definitions["LocationScreens"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.LocationScreens.id"];
          location_id?: parameters["rowFilter.LocationScreens.location_id"];
          /** Identifies a screen, in case a location has multiple */
          order_id?: parameters["rowFilter.LocationScreens.order_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.LocationScreens.id"];
          location_id?: parameters["rowFilter.LocationScreens.location_id"];
          /** Identifies a screen, in case a location has multiple */
          order_id?: parameters["rowFilter.LocationScreens.order_id"];
        };
        body: {
          /** LocationScreens */
          LocationScreens?: definitions["LocationScreens"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/Locations": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.Locations.id"];
          name?: parameters["rowFilter.Locations.name"];
          address?: parameters["rowFilter.Locations.address"];
          /** Latitude */
          lat?: parameters["rowFilter.Locations.lat"];
          lon?: parameters["rowFilter.Locations.lon"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["Locations"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** Locations */
          Locations?: definitions["Locations"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.Locations.id"];
          name?: parameters["rowFilter.Locations.name"];
          address?: parameters["rowFilter.Locations.address"];
          /** Latitude */
          lat?: parameters["rowFilter.Locations.lat"];
          lon?: parameters["rowFilter.Locations.lon"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.Locations.id"];
          name?: parameters["rowFilter.Locations.name"];
          address?: parameters["rowFilter.Locations.address"];
          /** Latitude */
          lat?: parameters["rowFilter.Locations.lat"];
          lon?: parameters["rowFilter.Locations.lon"];
        };
        body: {
          /** Locations */
          Locations?: definitions["Locations"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  Campaigns: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    name: string;
    status: string;
    location_config?: string;
    dueDate?: string;
  };
  LocationScreens: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Note:
     * This is a Foreign Key to `Locations.id`.<fk table='Locations' column='id'/>
     */
    location_id?: number;
    /** Identifies a screen, in case a location has multiple */
    order_id: number;
  };
  Locations: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    name: string;
    address?: string;
    /** Latitude */
    lat: number;
    lon: number;
  };
}

export interface parameters {
  /** Preference */
  preferParams: "params=single-object";
  /** Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** Preference */
  preferCount: "count=none";
  /** Filtering Columns */
  select: string;
  /** On Conflict */
  on_conflict: string;
  /** Ordering */
  order: string;
  /** Limiting and Pagination */
  range: string;
  /** Limiting and Pagination */
  rangeUnit: string;
  /** Limiting and Pagination */
  offset: string;
  /** Limiting and Pagination */
  limit: string;
  /** Campaigns */
  "body.Campaigns": definitions["Campaigns"];
  "rowFilter.Campaigns.id": string;
  "rowFilter.Campaigns.name": string;
  "rowFilter.Campaigns.status": string;
  "rowFilter.Campaigns.location_config": string;
  "rowFilter.Campaigns.dueDate": string;
  /** LocationScreens */
  "body.LocationScreens": definitions["LocationScreens"];
  "rowFilter.LocationScreens.id": string;
  "rowFilter.LocationScreens.location_id": string;
  /** Identifies a screen, in case a location has multiple */
  "rowFilter.LocationScreens.order_id": string;
  /** Locations */
  "body.Locations": definitions["Locations"];
  "rowFilter.Locations.id": string;
  "rowFilter.Locations.name": string;
  "rowFilter.Locations.address": string;
  /** Latitude */
  "rowFilter.Locations.lat": string;
  "rowFilter.Locations.lon": string;
}

export interface operations {}

export interface external {}
