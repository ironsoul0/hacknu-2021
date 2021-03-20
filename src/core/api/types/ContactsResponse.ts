type Contact = {
  readonly first_name: string;
  readonly last_name: string;
  readonly phone: string;
};

export type ContactsResponse = readonly Contact[];
