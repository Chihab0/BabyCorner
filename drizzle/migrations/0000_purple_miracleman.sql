CREATE TYPE "public"."delivery_method" AS ENUM('home', 'stopdesk');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled');--> statement-breakpoint
CREATE TABLE "admin_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "admin_users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "delivery_companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"prices" jsonb[]
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_name" text NOT NULL,
	"phone" text NOT NULL,
	"address" text NOT NULL,
	"wilaya_id" integer NOT NULL,
	"delivery_company_id" integer,
	"delivery_method" "delivery_method" NOT NULL,
	"items" jsonb[],
	"total_price" numeric NOT NULL,
	"status" "order_status" DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"category" text,
	"sizes" text[],
	"colors" text[],
	"price" numeric NOT NULL,
	"stock_quantity" integer NOT NULL,
	"images" text[],
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_delivery_company_id_delivery_companies_id_fk" FOREIGN KEY ("delivery_company_id") REFERENCES "public"."delivery_companies"("id") ON DELETE no action ON UPDATE no action;