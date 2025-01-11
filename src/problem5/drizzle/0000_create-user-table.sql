CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"age" integer,
	"phone" varchar(15),
	"email" varchar(100) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
