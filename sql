
create table Usuario(
	codigo_usuario varchar(50) primary key,
    nombre varchar(50),
    psw varchar(50),
    url_fotop varchar(250)
);
create table Album(
	codigo_album int primary key not null AUTO_INCREMENT,
    nombre varchar(50),
    usuario_codigo varchar(50),
    foreign key (usuario_codigo) references Usuario(codigo_usuario) on delete cascade
);

create table Foto(
	codigo_foto int primary key not null AUTO_INCREMENT,
    nombre varchar(50),
    tipo varchar(10),
    url_fotop varchar(250),
    album_codigo int,
    foreign key (album_codigo) references Album(codigo_album) on delete cascade
);
insert into Usuario values("usuario1", "usuario1", "usuario1", "url"),
							("usuario2", "usuario1", "usuario1", "url"),
                            ("usuario3", "usuario1", "usuario1", "url"),
                            ("usuario4", "usuario1", "usuario1", "url"),
                            ("usuario5", "usuario1", "usuario1", "url"),
                            ("usuario6", "usuario1", "usuario1", "url"),
                            ("usuario7", "usuario1", "usuario1", "url"),
                            ("usuario8", "usuario1", "usuario1", "url");

insert into Album (nombre,usuario_codigo) values("album1", "usuario1"),
						("album2", "usuario1"),
                        ("album3", "usuario1"),
                        ("album4", "usuario1"),
                        ("album5", "usuario2"),
                        ("album6", "usuario2"),
                        ("album7", "usuario2"),
                        ("album8", "usuario2"),
                        ("album9", "usuario2");
							
insert into Foto (nombre, tipo, url_fotop,album_codigo) values("nombre 1", "png", "url", 1),
						("nombre 2", "png", "url", 1),
                        ("nombre 3", "png", "url", 1),
                        ("nombre 4", "png", "url", 1),
                        ("nombre 5", "png", "url", 1),
                        ("nombre 6", "png", "url", 2),
                        ("nombre 7", "png", "url", 2);


insert into Album (nombre,usuario_codigo) values("album1", "elimazarieos"),
						("album2", "elimazarieos"),
                        ("album3", "elimazarieos"),
                        ("album4", "elimazarieos"),
                        ("album5", "elimazarieos"),
                        ("album6", "elimazarieos"),
                        ("album7", "elimazarieos"),
                        ("album8", "elimazarieos"),
                        ("album9", "elimazarieos");
						
insert into Foto (nombre, url_fotop,album_codigo) values("nombre 1", "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/Fotos_Perfil/elimazarieos.jpg", 1),
						("nombre 2",  "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/Fotos_Perfil/elimazarieos.jpg", 1),
                        ("nombre 3",  "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/Fotos_Perfil/elimazarieos.jpg", 1),
                        ("nombre 4",  "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/Fotos_Perfil/elimazarieos.jpg", 1),
                        ("nombre 5",  "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/Fotos_Perfil/elimazarieos.jpg", 2),
                        ("nombre 6",  "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/Fotos_Perfil/elimazarieos.jpg", 2),
                        ("nombre 7",  "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/Fotos_Perfil/elimazarieos.jpg", 2),
                        ("nombre 8",  "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/Fotos_Perfil/elimazarieos.jpg", 2),
                        ("nombre 9",  "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/Fotos_Perfil/elimazarieos.jpg", 3),
                        ("nombre 10",  "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/Fotos_Perfil/elimazarieos.jpg", 3),
                        ("nombre 11",  "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/Fotos_Perfil/elimazarieos.jpg", 3),
                        ("nombre 12",  "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/Fotos_Perfil/elimazarieos.jpg", 3),
                        ("nombre 13",  "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/Fotos_Perfil/elimazarieos.jpg", 4),
                        ("nombre 14",  "https://practica1-g30-imagenes.s3.us-east-2.amazonaws.com/Fotos_Perfil/elimazarieos.jpg", 4);                        
