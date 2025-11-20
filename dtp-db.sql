CREATE SCHEMA dtp_db;

CREATE  TABLE dtp_db.permissions ( 
	id                   CHAR(36)  DEFAULT ('uuid()')  NOT NULL   PRIMARY KEY,
	name                 VARCHAR(150)    NOT NULL   ,
	description          TEXT       ,
	created_at           TIMESTAMP  DEFAULT (current_timestamp())     ,
	CONSTRAINT name UNIQUE ( name ) 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE  TABLE dtp_db.roles ( 
	id                   CHAR(36)  DEFAULT ('uuid()')  NOT NULL   PRIMARY KEY,
	name                 VARCHAR(150)    NOT NULL   ,
	description          TEXT       ,
	created_at           TIMESTAMP  DEFAULT (current_timestamp())     ,
	CONSTRAINT name UNIQUE ( name ) 
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE  TABLE dtp_db.users ( 
	id                   CHAR(36)  DEFAULT ('uuid()')  NOT NULL   PRIMARY KEY,
	full_name            VARCHAR(255)    NOT NULL   ,
	email                VARCHAR(255)    NOT NULL   ,
	password_hash        VARCHAR(255)    NOT NULL   ,
	role_id              CHAR(36)    NOT NULL   ,
	created_at           TIMESTAMP  DEFAULT (current_timestamp())     ,
	CONSTRAINT email UNIQUE ( email ) ,
	CONSTRAINT fk_users_role FOREIGN KEY ( role_id ) REFERENCES dtp_db.roles( id ) ON DELETE NO ACTION ON UPDATE CASCADE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE INDEX idx_users_role ON dtp_db.users ( role_id );

CREATE  TABLE dtp_db.faq ( 
	id                   CHAR(36)  DEFAULT ('uuid()')  NOT NULL   PRIMARY KEY,
	question             TEXT    NOT NULL   ,
	answer               TEXT    NOT NULL   ,
	category             VARCHAR(255)       ,
	created_by           CHAR(36)       ,
	updated_by           CHAR(36)       ,
	created_at           TIMESTAMP  DEFAULT (current_timestamp())     ,
	updated_at           TIMESTAMP  DEFAULT (current_timestamp()) ON UPDATE current_timestamp()    ,
	CONSTRAINT fk_faq_created_by FOREIGN KEY ( created_by ) REFERENCES dtp_db.users( id ) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT fk_faq_updated_by FOREIGN KEY ( updated_by ) REFERENCES dtp_db.users( id ) ON DELETE SET NULL ON UPDATE CASCADE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE INDEX idx_faq_created_by ON dtp_db.faq ( created_by );

CREATE INDEX idx_faq_updated_by ON dtp_db.faq ( updated_by );

CREATE  TABLE dtp_db.role_permissions ( 
	id                   CHAR(36)  DEFAULT ('uuid()')  NOT NULL   PRIMARY KEY,
	role_id              CHAR(36)    NOT NULL   ,
	permission_id        CHAR(36)    NOT NULL   ,
	created_at           TIMESTAMP  DEFAULT (current_timestamp())     ,
	CONSTRAINT fk_role_permissions_permission FOREIGN KEY ( permission_id ) REFERENCES dtp_db.permissions( id ) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_role_permissions_role FOREIGN KEY ( role_id ) REFERENCES dtp_db.roles( id ) ON DELETE CASCADE ON UPDATE CASCADE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE INDEX idx_role_permissions_role ON dtp_db.role_permissions ( role_id );

CREATE INDEX idx_role_permissions_permission ON dtp_db.role_permissions ( permission_id );

