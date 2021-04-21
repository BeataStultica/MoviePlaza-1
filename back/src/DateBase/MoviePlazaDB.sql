 /*******************************
 *
 * FILENAME:         MoviePlaza.sql 
 * 
 * BRIEF:            This file contains product, customer
 *                   data and realization of database for
 *                   github.com/NazariyProshyn/MoviePlaza
 *
 * AUTHOR:           Nazarii Proshyn
 *
 * CONTACT:          nazariyproshyn@gmail.com
 *
 *******************************/
 
 
 /******************************
 *
 * DB name:             MoviePlaza
 *
 * BRIEF:               Contains information about
 *                      customers, films, transactions
 *                      of "MoviePlaza" service
 *
 * TABLES:              "User",         "UserInformation"
 *                      "FilmInfo",     "FavouriteGanres"
 *                      "BoughtFilms"   "TransactDetails"    
 *                      "Genres",       "RoomInformation" 
 *                      "Reits",        "TypesOfTransact"  
 *                      "Filmdata",     "Comments",
 *                      "FilmGanres"
 *
 * Description:
 * "User":              This table stores the main    
 *                      information about the client-
 *                      date of birth, name, surname,
 *                      money in the account.The "UserId"
 *                      column is taken as the primary key.
 *
 * "UserInformation":   This table has information about the
 *                      client's account - his login and 
 *                      password.The "UserId" column is taken
 *                      as the primary key.
 *
 * "FilmInfo":          This table contains the main information
 *                      about the film - its title, price,
 *                      genre and description.The "FilmId" column is taken
 *                      as the primary key.
 *
 * "BoughtFilms":       This table contains information about
 *                      movies purchased by different customers.
 *                      "UserId" and "FilmId" columns are 
 *                      taken as a composite primary key
 *
 * "FavouriteGanres":   This table contains information about
 *                      favourite ganres of clients.The "UserId", 
 *                      "GenresId" column is taken as the primary key.
 *
 * "FilmGanres":        This table contains information about
 *                      film ganres.
 *
 * "TransactDetails":   This table contains the main information
 *                      about the transaction - customer, amount, date.
 *
 * "Genres":            This table contains information about genres 
 *                      which site "MoviePlaza" has. The "GenreId"
 *                      column is taken as the primary key.
 *
 * "Filmdata":          This table contains main films information:
 *                      films images and films.The "FilmId"
 *                      column is taken as the primary key.
 *
 * "Reits":             This table contains information about
 *                      the movie rating - the number of votes
 *                      and the overall rating. The "FilmId"
 *                      column is taken as the primary key.
 *
 * "Comments":          This table contains viewers comments
 *                      for different films and other comments.
 *
 * "TypesOfTransact":   This table lists the possible types of
 *                      transactions provided by the site "MoviePlaza".
 *
 * "RoomInformation":   This table contains the main information
 *                      about the room - who created it and
 *                      the key to this room.
 *
 ******************************/
 
/*
  *BRIEF: Creating of datebase
  *
  */
 CREATE DATABASE "MoviePlaza"

 /*
  *BRIEF: Creating of table User
  *
  */

 CREATE TABLE "User" (
	"UserId"     serial       NOT NULL,
	"FirstName"  varchar(255) NOT NULL,
	"SecondName" varchar(255) NOT NULL,
	"BDate"      DATE         NOT NULL,
	"Money"      money,
	CONSTRAINT "User_pk" PRIMARY KEY ("UserId")
 ) WITH (
  OIDS = FALSE
 );

 /*
  *BRIEF: Creating of table UserInformation
  *
  */
 CREATE TABLE "UserInformation" (
	"UserId"    serial       NOT NULL,
	"Login"     varchar(255) NOT NULL UNIQUE,
	"Password"  varchar(255) NOT NULL,
	"userImage" varchar(255) NOT NULL,
	CONSTRAINT "UserInformation_pk" PRIMARY KEY ("UserId")
) WITH (
  OIDS = FALSE
);

 /*
  *BRIEF: Creating of table FilmInfo
  *
  */
CREATE TABLE "FilmInfo" (
	"FilmId"   serial NOT NULL,
	"FilmName" text NOT NULL UNIQUE,
	"Price"    int,
	"InformationAboutFilm" text NOT NULL,
	CONSTRAINT "FilmInfo_pk" PRIMARY KEY ("FilmId")
) WITH (
  OIDS = FALSE
);

 /*
  *BRIEF: Creating of table BoughtFilms
  *
  */
CREATE TABLE "BoughtFilms" (
	"UserId" int NOT NULL,
	"FilmId" int NOT NULL,
	CONSTRAINT "BoughtFilms_pk" PRIMARY KEY ("UserId","FilmId")
) WITH (
  OIDS = FALSE
);

 /*
  *BRIEF: Creating of table FavouriteGanres
  *
  */
CREATE TABLE "FavouriteGenres" (
	"UserId"   int NOT NULL,
	"GenresId" int NOT NULL,
	CONSTRAINT "FavouriteGenres_pk" PRIMARY KEY ("UserId","GenresId")
) WITH (
  OIDS = FALSE
);

 /*
  *BRIEF: Creating of table FilmGanres
  *
  */
CREATE TABLE "FilmGenres" (
	"FilmId"   int NOT NULL,
	"GenresId" int NOT NULL,
	CONSTRAINT "FilmGenres_pk" PRIMARY KEY ("FilmId","GenresId")
) WITH (
  OIDS = FALSE
);

 /*
  *BRIEF: Creating of table TransactDetails
  *
  */
CREATE TABLE "TransactDetails" (
	"UserId"        int    NOT NULL,
	"TypeId"        bigint NOT NULL,
	"DateofPayment" DATE   NOT NULL,
	"Amount"        int,
	"Number"        int    
) WITH (
  OIDS = FALSE
);

 /*
  *BRIEF: Creating of table Genres
  *
  */
CREATE TABLE "Genres" (
	"GenreId" serial       NOT NULL,
	"Genre"   varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "Genres_pk" PRIMARY KEY ("GenreId")
) WITH (
  OIDS = FALSE
);

 /*
  *BRIEF: Creating of table Filmdata
  *
  */
CREATE TABLE "Filmdata" (
	"FilmId"        serial        NOT NULL,
	"Filmreference" varchar(255)  NOT NULL,
	"Filmimage"     varchar(255)  NOT NULL,
	"Dateofrelease" date,
	"Duration"      int,
	CONSTRAINT "Filmdata_pk" PRIMARY KEY ("FilmId")
) WITH (
  OIDS = FALSE
);

 /*
  *BRIEF: Creating of table Reits
  *
  */
CREATE TABLE "Rating" (
	"FilmId"      serial NOT NULL,
	"NumofVoices" bigint NOT NULL,
	"Rate"        float8 NOT NULL,
	CONSTRAINT "Reits_pk" PRIMARY KEY ("FilmId")
) WITH (
  OIDS = FALSE
);

 /*
  *BRIEF: Creating of table Comments
  *
  */
CREATE TABLE "Comments" (
	"FilmId"  int          NOT NULL,
	"Comment" varchar(255) NOT NULL,
	"UserId"  int          NOT NULL
) WITH (
  OIDS = FALSE
);

 /*
  *BRIEF: Creating of table TypesOfTransact
  *
  */
CREATE TABLE "TypesOfTransact" (
	"TypeId" bigint NOT NULL,
	"Type"   serial NOT NULL,
	CONSTRAINT "TypesOfTransact_pk" PRIMARY KEY ("TypeId")
) WITH (
  OIDS = FALSE
);

 /*
  *BRIEF: Creating of table TypesOfTransact
  *
  */
CREATE TABLE "RoomInformation" (
	"CreatorId" int          NOT NULL,
	"RoomKey"   varchar(255) NOT NULL,
	"Film"      varchar(255),
	"Time"      int,
	CONSTRAINT "RoomInformation_pk" PRIMARY KEY ("RoomKey")
) WITH (
  OIDS = FALSE
);

 /*
  *BRIEF: Addind foreign keys
  *
  */
ALTER TABLE "BoughtFilms"     ADD CONSTRAINT "BoughtFilms_fk0"     FOREIGN KEY ("UserId")    REFERENCES "User"("UserId");

ALTER TABLE "BoughtFilms"     ADD CONSTRAINT "BoughtFilms_fk1"     FOREIGN KEY ("UserId")    REFERENCES "FilmInfo"("FilmId");

ALTER TABLE "RoomInformation" ADD CONSTRAINT "RoomInformation_fk0" FOREIGN KEY ("CreatorId") REFERENCES "User"("UserId");

ALTER TABLE "TransactDetails" ADD CONSTRAINT "TransactDetails_fk0" FOREIGN KEY ("UserId")    REFERENCES "User"("UserId");

ALTER TABLE "UserInformation" ADD CONSTRAINT "UserInformation_fk0" FOREIGN KEY ("UserId")    REFERENCES "User"("UserId");

ALTER TABLE "TransactDetails" ADD CONSTRAINT "TypesOfTransact_fk0" FOREIGN KEY ("TypeId")    REFERENCES "TypesOfTransact"("TypeId");

ALTER TABLE "FavouriteGenres" ADD CONSTRAINT "FavouriteGenres_fk0" FOREIGN KEY ("UserId")    REFERENCES "User"("UserId");

ALTER TABLE "FavouriteGenres" ADD CONSTRAINT "FavouriteGenres_fk1" FOREIGN KEY ("GenresId")  REFERENCES "Genres"("GenreId");

ALTER TABLE "Comments"        ADD CONSTRAINT "Comments_fk1"        FOREIGN KEY ("FilmId")    REFERENCES "FilmInfo"("FilmId");

ALTER TABLE "Rating"          ADD CONSTRAINT "Reits_fk1"           FOREIGN KEY ("FilmId")    REFERENCES "FilmInfo"("FilmId");

ALTER TABLE "Filmdata"        ADD CONSTRAINT "Filmdata_fk1"        FOREIGN KEY ("FilmId")    REFERENCES "FilmInfo"("FilmId");
 
ALTER TABLE "FilmGenres"      ADD CONSTRAINT "FilmGenres_fk0"      FOREIGN KEY ("FilmId")    REFERENCES "FilmInfo"("FilmId");

ALTER TABLE "FilmGenres"      ADD CONSTRAINT "FilmGenres_fk1"      FOREIGN KEY ("GenresId")  REFERENCES "Genres"("GenreId");

ALTER TABLE "Comments"        ADD CONSTRAINT "Comments_fk2"        FOREIGN KEY ("UserId")    REFERENCES "User"("UserId");


/*
 *
 * @brief: Insert data
 *
 */

SELECT * FROM "User"

INSERT INTO "User" ("FirstName", "SecondName", "BDate", "Money")
    VALUES ('Nazarii', 'Proshyn', '2001-10-05','100000');
	
INSERT INTO "User" ("FirstName", "SecondName", "BDate", "Money")
    VALUES ('Bogdan', 'Khersonskii', '2001-12-07','100000');
	
INSERT INTO "User" ("FirstName", "SecondName", "BDate", "Money")
    VALUES ('Dmytro', 'Ukrainets', '2001-07-07','100000');
	
INSERT INTO "User" ("FirstName", "SecondName", "BDate", "Money")
    VALUES ('Natzu', 'Dragnil', '777-07-07','77777');
	
INSERT INTO "User" ("FirstName", "SecondName", "BDate", "Money")
    VALUES ('Asta', 'KingOfMags', '1001-11-15','0');
	
	

INSERT INTO "UserInformation" ("Login", "Password", "userImage")
    VALUES ('nproshyn', 'qwerty1', 'user.png');
	
INSERT INTO "UserInformation" ("Login", "Password", "userImage")
    VALUES ('bkhersonskii', 'qwerty2', 'user.png');
	
INSERT INTO "UserInformation" ("Login", "Password", "userImage")
    VALUES ('dukrainets', 'qwerty3', 'user.png');
	
INSERT INTO "UserInformation" ("Login", "Password", "userImage")
    VALUES ('ndragnil', 'qwerty4', 'user.png');
	
INSERT INTO "UserInformation" ("Login", "Password", "userImage")
    VALUES ('akingofmags', 'qwerty5', 'user.png');
	
	
	
 INSERT INTO "Genres" ("Genre")
    VALUES ('Комедия');

 INSERT INTO "Genres" ("Genre")
    VALUES ('Фэнтези');
	
 INSERT INTO "Genres" ("Genre")
    VALUES ('Боевик');
	
 INSERT INTO "Genres" ("Genre")
    VALUES ('Детектив');
	
 INSERT INTO "Genres" ("Genre")
    VALUES ('Ужасы');
	
 INSERT INTO "Genres" ("Genre")
    VALUES ('Триллер');
	
 INSERT INTO "Genres" ("Genre")
    VALUES ('Драма');
	

  INSERT INTO "FavouriteGenres" ("UserId","GenresId")
    VALUES (1,1),
	       (2,1),
		   (3,1),
		   (4,1),
		   (5,1);
		   
		   
 INSERT INTO "FilmGenres" ("FilmId","GenresId")
    VALUES (1,1),(1,2),
	       (2,1),
		   (3,2),(3,3),
		   (4,1),(4,4),
		   (5,5),(5,6),
		   (6,7),(6,3),
		   (7,2),(7,3),
		   (8,6),(8,7),
		   (9,1),(9,3),
		   (10,1),(10,5);
			
			
  INSERT INTO "FilmInfo" ("FilmName","Price","InformationAboutFilm")
    VALUES ('FilmName1',5.7,'Description-Lorem FilmName1 ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua.'),
	       ('FilmName2',4  ,'Description-Lorem FilmName2 ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua.'),
		   ('FilmName3',2.1,'Description-Lorem FilmName3 ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua.'),
		   ('FilmName4',2.4,'Description-Lorem FilmName4 ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua.'),
		   ('FilmName5',9.3,'Description-Lorem FilmName5 ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua.'),
		   ('FilmName6',3.3,'Description-Lorem FilmName6 ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua.'),
		   ('FilmName7',1.2,'Description-Lorem FilmName7 ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua.'),
		   ('FilmName8',0.1,'Description-Lorem FilmName8 ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua.'),
		   ('FilmName9',0  ,'Description-Lorem FilmName9 ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua.'),
		   ('FilmName10',7.7,'Description-Lorem FilmName10 ipsum dolor sit amet,tempor incididunt ut labore et dolore magna aliqua.');
		   
  INSERT INTO "Filmdata"("Filmreference", "Filmimage", "Dateofrelease", "Duration")
  	VALUES   ('FilmName1', 'film.png','2001-07-02', 25),
	         ('FilmName2', 'film.png','2002-07-02', 125),
			 ('FilmName3', 'film.png','2001-04-02', 45),
			 ('FilmName4', 'film.png','2001-07-03', 20),
			 ('FilmName5', 'film.png','2005-04-01', 80),
			 ('FilmName6', 'film.png','1999-04-03', 120),
			 ('FilmName7', 'film.png','1975-10-10', 141),
			 ('FilmName8', 'film.png','2021-04-12', 321),
			 ('FilmName9', 'film.png','2020-12-12', 12),
			 ('FilmName10', 'film.png','2017-05-02', 15);

   INSERT INTO "Rating"("NumofVoices","Rate")
     VALUES    (10,3.3),
	           (42,4.2),
			   (1,5),
			   (23,3.3),
			   (100,3.3),
			   (19,3.3),
			   (35,3.3),
			   (21,3.3),
			   (7,3.3),
			   (52,3.3);

   INSERT INTO "Comments"("FilmId","Comment","UserId")
      VALUES   (1, 'good1', 1),  (1, 'norm1', 3), (1, 'bored1', 2),
	           (2, 'good2', 4),  (2, 'norm2', 1), (2, 'bored2', 2),
			   (3, 'good3', 2),  (3, 'norm3', 3), (3, 'bored3', 5),
			   (4, 'good4', 3),  (4, 'norm4', 4), (4, 'bored4', 5),
			   (5, 'good5', 2),  (5, 'norm5', 1), (5, 'bored5', 5),
			   (6, 'good6', 1),  (6, 'norm6', 2), (6, 'bored6', 4),
			   (7, 'good7', 3),  (7, 'norm7', 1), (7, 'bored7', 2),
			   (8, 'good8', 2),  (8, 'norm8', 3), (8, 'bored8', 1),
			   (9, 'good9', 4),  (9, 'norm9', 2), (9, 'bored9', 5),
			   (10,'good10',3),  (10,'norm10',4), (10,'bored1', 5);
			   
 /*
 *
 * @brief: UPDATE data
 *
 */
 select * from "FilmInfo"
 
    UPDATE "FilmInfo" 
	  SET  "FilmName"             = 'Семейка Аддамс',
	       "InformationAboutFilm" = 'Черная комедия о колоритной семейке, обитающей в не менее колоритном доме.
		  Глава семьи, Гомес Аддамс - очень самоуверенный и довольно импульсивный тип, который четверть века тому 
		  назад страшно поругался со своим старшим братом Фестером, после чего тот пропал без вести. Все попытки
		  отыскать его были безуспешными. Но вот, однажды на пороге фамильного особняка появляется некто,
		  очень похожий на Фестера.'
	   WHERE "FilmId" = 1;
	   
	UPDATE "FilmInfo" 
	  SET  "FilmName"             = 'Рыцари справедливости',
	       "InformationAboutFilm" = 'Когда жена Маркуса трагически погибает в железнодорожной катастрофе,
		  это кажется нелепой случайностью. А если это тщательно спланированное убийство? Военный,
		  сумасшедший математик и парочка гиков объединяются,чтобы выяснить, что случилось на самом деле.
		  Теперь они — Рыцари справедливости.'
	   WHERE "FilmId" = 2;
	     
	UPDATE "FilmInfo" 
	  SET  "FilmName"             = 'Охотник на монстров',
	       "InformationAboutFilm" = 'Параллельно нашему миру существует иной: мир,
		  где правят крайне опасные и наделенные невероятной силой монстры, яростно
		  оберегающие свои владения от чужаков. Именно сюда через пространственный
		  портал попадают лейтенант Артемис и ее отряд элитных бойцов. И теперь им
		  предстоит проверить себя на прочность перед лицом невиданной ранее угрозы.
		  В попытке выжить и найти дорогу домой, Артемис объединяет силы с таинственным
		  Охотником, который научился выживать в этих враждебных землях.
		  Вместе героям предстоит вступить в беспощадную схватку с монстрами, не знающими страха и жалости.'
	   WHERE "FilmId" = 3;
	     
	UPDATE "FilmInfo" 
	  SET  "FilmName"             = 'Эйс Вентура 2: Когда зовет природа',
	       "InformationAboutFilm" = 'Место действия - Африка. Знаменитый детектив Эйс Вентура, единственный
		  в мире специалист по розыску пропавших домашних любимцев, снова в деле. На этот раз Эйс должен
		  найти Шикаку - священное животное племени Вачати. Без Шикаки не может состояться свадьба дочери
		  вождя племени Вачати и сына вождя воинственного племени Вачуту. Если Эйс провалит задание, начнется
		  межплеменная война. Но Эйс Вентура не из тех, кто отступает перед трудностями. В поисках священной
		  Шикаки он сражается с аллигаторами, приручает слонов, подражает обезьянам, качается на лианах, 
		  ходит по раскаленным углям, вылезает, к ужасу семьи американских туристов, из задницы носорога и 
		  ставит «на уши» всю Африку.'
	   WHERE "FilmId" = 4;
	   
	UPDATE "FilmInfo" 
	  SET  "FilmName"             = 'Людоед',
	       "InformationAboutFilm" = 'Действие фильма происходит в 1847 году, в период войны Америки с Мексикой.
		  Капитана Джона Бойда чествуют и награждают различными медалями, однако он не рад этим обстоятельствам.
		  Причиной его чествования стал захват ставки противника в одиночку, но только он один знает все обстоятельства
		  столь смелого поступка — он просто струсил, бросил оружие и притворился мёртвым. Так он пролежал длительное
		  время среди мёртвых товарищей, а впоследствии в состоянии аффекта поубивал всех неприятелей. Однако продвижения
		  по службе Джон не получил, вместо этого его направляют в одинокий форт в горах Калифорнии.Через некоторое время
		  в форт приходит оборванный и изголодавшийся мужчина по имени Калхун. Из его истории становится ясно,
          что он был членом каравана, который вёл проводник. Проводник заблудился и люди, в связи с наступившей зимой,
          поселились в пещере. Однако запасов еды было мало и в тот момент, когда они кончились люди начали поедать друг
		  друга. Калхуну удалось бежать.'
	   WHERE "FilmId" = 5;
	   
	UPDATE "FilmInfo" 
	  SET  "FilmName"             = 'Гладиатор',
	       "InformationAboutFilm" = 'Максимус прославился на всю Римскую империю, как справедливый и храбрый военачальник. 
		  Воины, которым довелось быть в рядах его армии, уважали генерала, боготворили его и готовы были идти на любые
		  жертвы ради него. Казалось, что он непобедим, но придворные интриги все же его подкосили.
          Не желая присягнуть наследнику престола, который попросту убил своего отца, Максимус оказывается
          приговоренным к смертной казни. Ему чудом удается спастись, однако недруги не пощадили его супругу и сына.
		  Впоследствии судьба приводит бывшего военачальника в Колизей, где он становится гладиатором. Раз за разом он поражает
          публику своим непревзойденным мастерством, и вскоре ему предстоит сойтись на арене со своим главным врагом.'
	   WHERE "FilmId" = 6;
	   
	UPDATE "FilmInfo" 
	  SET  "FilmName"             = '300 спартанцев',
	       "InformationAboutFilm" = 'На пороге далекого 480 года, ушедшего столетия, территория Греции окружена персидскими
		  войсками. Вражеская армия стремительно наступает по всем направлениям, атакуяпротивников и пытаясь прорвать оборону.
		  Цель персидского царя Ксеркса захватить власть и расширить собственные горизонты.Правитель надеется на успех, ведь
		  в его распоряжении тысячи воинов.Уверенно подступая к греческим землям, войска неожиданно сталкиваются с серьезной
		  преградой. Отряд храбрых и бесстрашных спартанцев, под руководством царя Леонида, дает достойный отпор противнику.
		  Бойцы стараются выдержать оборону и не допустить вторжения врага. Благодаря мужеству, силе, отваге и героизму
		  300 спартанцев, народ объединяется и встает на защиту Греции. Теперь им вместе предстоит отвоевать родные земли
		  и нанести персидским воинам ответный удар. Но удастся ли сплоченному народу одержать победу, сокрушить сильного
		  и практически неуязвимого противника?'
	   WHERE "FilmId" = 7;
	   
	UPDATE "FilmInfo" 
	  SET  "FilmName"             = 'Омерзительная восьмерка',
	       "InformationAboutFilm" = 'США после Гражданской войны. Легендарный охотник за головами Джон Рут по кличке
		  Вешатель конвоирует заключенную. По пути к ним прибиваются еще несколько путешественников. Снежная буря
		  вынуждает компанию искать укрытие в лавке на отшибе, где уже расположилось весьма пестрое общество:
		  генерал конфедератов, мексиканец, ковбой... И один из них - не тот, за кого себя выдает.'
	   WHERE "FilmId" = 8;
	   
	UPDATE "FilmInfo" 
	  SET  "FilmName"             = 'Такси',
	       "InformationAboutFilm" = 'Молодой таксист Даниэль помешан на быстрой езде. Как ураган, проносится он
		  по извилистым улицам Марселя на своём мощном ревущем звере «Пежо», пугая пассажиров и прохожих.
		  Неподкупный полицейский Эмильен вынуждает его помочь в поимке банды грабителей, ускользающих от полиции 
		  на своих неуловимых «Мерседесах».И до самого конца не ясно, кто же сможет удержаться на крутом вираже.'
	   WHERE "FilmId" = 9;
	   
	UPDATE "FilmInfo" 
	  SET  "FilmName"             = 'Живая мертвечина',
	       "InformationAboutFilm" = 'С острова Суматра вывезена обезьяна, из-за одного укуса которой туземцы отрубили
		  зоологу, приехавшему ее отловить, обе руки, а затем и голову. Уже в наше время эта тварь укусила злобную
		  мамашу нашего героя, которая не дает ему встречаться с любимой девушкой.Последствия укуса ужасны, картину
		  постепенно населяют жуткие зомби...'
	   WHERE "FilmId" = 10;
	   
	   SELECT * FROM "FilmInfo" ORDER BY "FilmId"
	   
	   
	   
	UPDATE "Filmdata" 
	  SET  "Filmimage"     = 'film1.png',
	       "Dateofrelease" = '1991-01-01',
		   "Duration"      = 99
	   WHERE "FilmId" = 1;
	      
	UPDATE "Filmdata" 
	  SET  "Filmimage"     = 'film2.png',
	       "Dateofrelease" = '2020-01-01',
		   "Duration"      = 116
	   WHERE "FilmId" = 2;
	      
	UPDATE "Filmdata" 
	  SET  "Filmimage"     = 'film3.png',
	       "Dateofrelease" = '2020-01-01',
		   "Duration"      = 103
	   WHERE "FilmId" = 3;
	   
	UPDATE "Filmdata" 
	  SET  "Filmimage"     = 'film4.png',
	       "Dateofrelease" = '1995-01-01',
		   "Duration"      = 94
	   WHERE "FilmId" = 4;
	   
	UPDATE "Filmdata" 
	  SET  "Filmimage"     = 'film5.png',
	       "Dateofrelease" = '1999-01-01',
		   "Duration"      = 101
	   WHERE "FilmId" = 5;
	   
	UPDATE "Filmdata" 
	  SET  "Filmimage"     = 'film6.png',
	       "Dateofrelease" = '2000-01-01',
		   "Duration"      = 170
	   WHERE "FilmId" = 6;
	   
	UPDATE "Filmdata" 
	  SET  "Filmimage"     = 'film7.png',
	       "Dateofrelease" = '2007-01-01',
		   "Duration"      = 101
	   WHERE "FilmId" = 7;
	   
	UPDATE "Filmdata" 
	  SET  "Filmimage"     = 'film8.png',
	       "Dateofrelease" = '2015-01-01',
		   "Duration"      = 167
	   WHERE "FilmId" = 8;
	   
	UPDATE "Filmdata" 
	  SET  "Filmimage"     = 'film9.png',
	       "Dateofrelease" = '1998-01-01',
		   "Duration"      = 89
	   WHERE "FilmId" = 9;
	   
	UPDATE "Filmdata" 
	  SET  "Filmimage"     = 'film10.png',
	       "Dateofrelease" = '1992-01-01',
		   "Duration"      = 93
	   WHERE "FilmId" = 10;
	   
 /*
 *
 * @brief: Create Procedure
 *
 * @return:
 */

CREATE OR REPLACE FUNCTION FilmPage(idfilm integer)
  RETURNS TABLE (FilmName             text
               , Price                int
               , InformationAboutFilm text
			   , Filmimage            varchar(255)
			   , Dateofrelease        int
			   , Duration             int
			   , NumofVoices          bigint
			   , Rate             float) AS
$func$
BEGIN
RETURN QUERY
SELECT f1."FilmName",  f1."Price",         f1."InformationAboutFilm",
       f2."Filmimage", EXTRACT(YEAR FROM f2."Dateofrelease")::integer, f2."Duration",
	   f3."NumofVoices", f3."Rate" 
FROM   "FilmInfo" f1
  JOIN "Filmdata" f2 ON f2."FilmId" = f1."FilmId"
  JOIN "Rating"   f3 ON f3."FilmId" = f1."FilmId"
  WHERE f1."FilmId" = @idfilm;
END
$func$  LANGUAGE plpgsql;

select * from FilmPage(5);


 /*
 *
 * @brief: Create Procedure
 *
 * @return:
 */
CREATE OR REPLACE FUNCTION GetComments(idfilm integer)
  RETURNS TABLE (Comments    varchar(255)
               , UserId      int) AS
$func$
BEGIN
RETURN QUERY
SELECT "Comment", "UserId" 
  FROM "Comments"
  WHERE "FilmId" = @idfilm;
END
$func$  LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION GetGenres(idfilm integer)
  RETURNS TABLE (Genre    varchar(255)
           ) AS
$func$
BEGIN
RETURN QUERY
SELECT "Genre" 
  FROM "Genres" as gn
  JOIN "FilmGenres" as fg ON fg."GenresId" = gn."GenreId"
  WHERE "FilmId" = @idfilm;
END
$func$  LANGUAGE plpgsql;
select * from GetGenres(6);



CREATE OR REPLACE FUNCTION SortFilms(minyear integer DEFAULT 0, maxyear integer DEFAULT 3000,
									 minduration integer DEFAULT 0, maxduration integer DEFAULT 999,
								     minprice    integer DEFAULT 0, maxprice    integer DEFAULT 999,
								     minrate     float   DEFAULT 0, maxrate       float DEFAULT 999,  genre varchar(255) DEFAULT 'Комедия',
									 nameofilm varchar(255) DEFAULT '%%')
  RETURNS TABLE (id                   int
	  		   , FilmName             text
               , Price                int
               , InformationAboutFilm text
			   , Filmimage            varchar(255)
			   , Dateofrelease        int
			   , Duration             int
			   , NumofVoices          bigint
			   , Rate                 float) AS
$func$
BEGIN
RETURN QUERY
SELECT f1."FilmId", f1."FilmName",  f1."Price",         f1."InformationAboutFilm",
       f2."Filmimage", EXTRACT(YEAR FROM f2."Dateofrelease")::integer, f2."Duration",
	   f3."NumofVoices", f3."Rate"
FROM   "FilmInfo" f1
  JOIN "Filmdata" f2 ON f2."FilmId" = f1."FilmId"
  JOIN "Rating"   f3 ON f3."FilmId" = f1."FilmId"
  WHERE f1."Price"    >= @minprice    AND
        f1."Price"    <= @maxprice    AND
		f2."Duration" >= @minduration AND
        f2."Duration" <= @maxduration AND
		EXTRACT(YEAR FROM f2."Dateofrelease") >= @minyear AND
		EXTRACT(YEAR FROM f2."Dateofrelease") <= @maxyear AND
		f3."Rate"     >= @minrate     AND
        f3."Rate"     <= @maxrate     AND
		LOWER(f1."FilmName") LIKE LOWER(nameofilm)  AND
		f1."FilmId" IN (
			SELECT "FilmId" FROM "FilmGenres"
		       WHERE "GenresId" IN (
				   SELECT "GenreId" FROM "Genres"
				     WHERE "Genre" = genre))
					 ORDER BY f3."Rate" DESC;
		
END
$func$  LANGUAGE plpgsql;

select * from SortFilms(genre=>'Детектив');


CREATE OR REPLACE FUNCTION SortFilmsWithoutGenre(minyear integer DEFAULT 0, maxyear integer DEFAULT 3000,
									 minduration integer DEFAULT 0, maxduration integer DEFAULT 999,
								     minprice    integer DEFAULT 0, maxprice    integer DEFAULT 999,
								     minrate     float   DEFAULT 0, maxrate       float DEFAULT 999)
  RETURNS TABLE (id                   int
	  		   , FilmName             text
               , Price                int
               , InformationAboutFilm text
			   , Filmimage            varchar(255)
			   , Dateofrelease        int
			   , Duration             int
			   , NumofVoices          bigint
			   , Rate                 float) AS
$func$
BEGIN
RETURN QUERY
SELECT f1."FilmId", f1."FilmName",  f1."Price",         f1."InformationAboutFilm",
       f2."Filmimage", EXTRACT(YEAR FROM f2."Dateofrelease")::integer, f2."Duration",
	   f3."NumofVoices", f3."Rate"
FROM   "FilmInfo" f1
  JOIN "Filmdata" f2 ON f2."FilmId" = f1."FilmId"
  JOIN "Rating"   f3 ON f3."FilmId" = f1."FilmId"
  WHERE f1."Price"    >= @minprice    AND
        f1."Price"    <= @maxprice    AND
		f2."Duration" >= @minduration AND
        f2."Duration" <= @maxduration AND
		EXTRACT(YEAR FROM f2."Dateofrelease") >= @minyear AND
		EXTRACT(YEAR FROM f2."Dateofrelease") <= @maxyear AND
		f3."Rate"     >= @minrate     AND
        f3."Rate"     <= @maxrate
ORDER BY f3."Rate" DESC;
END
$func$  LANGUAGE plpgsql;

select * from SortFilmsWithoutGenre();


CREATE OR REPLACE FUNCTION CheckUser(Ulogin varchar(255), Upass varchar(255)) RETURNS integer AS $$
    SELECT COUNT(*) FROM "UserInformation"
	WHERE "Login" = Ulogin AND "Password" = Upass;
$$ LANGUAGE SQL;

SELECT * FROM public.checkuser('nproshyn', 'qwerty41');


CREATE OR REPLACE FUNCTION LastFilms()
  RETURNS TABLE (id                   int                           
	  		   , FilmName             text
               , Price                int
               , InformationAboutFilm text
			   , Filmimage            varchar(255)
			   , Dateofrelease        int
			   , Duration             int
			   , NumofVoices          bigint
			   , Rate             float) AS
$func$
BEGIN
RETURN QUERY
SELECT f1."FilmId", f1."FilmName",  f1."Price",         f1."InformationAboutFilm",
       f2."Filmimage", EXTRACT(YEAR FROM f2."Dateofrelease")::integer, f2."Duration",
	   f3."NumofVoices", f3."Rate"
FROM   "FilmInfo" f1
  JOIN "Filmdata" f2 ON f2."FilmId" = f1."FilmId"
  JOIN "Rating"   f3 ON f3."FilmId" = f1."FilmId"
ORDER BY  f1."FilmId" DESC
LIMIT  6;
END
$func$  LANGUAGE plpgsql;

SELECT * from LastFilms();
		
		
		
		
CREATE OR REPLACE FUNCTION UserInfo(Ulogin varchar(255))
  RETURNS TABLE (
	  			id            int
	  		   , FirstName    varchar(255)
               , SecondName   varchar(255)
               , BDate        date
			   , Moneys       money
			   , userImage    varchar(255)
  			   , favourite_genre varchar(255)) AS
$func$
BEGIN
RETURN QUERY
SELECT f1."UserId", f1."FirstName", f1."SecondName", f1."BDate",
       f1."Money", f2."userImage", f4."Genre"
FROM   "User" f1
  JOIN "UserInformation" f2 ON f2."UserId" = f1."UserId"
  JOIN "FavouriteGenres" f3 ON f3."UserId" = f1."UserId"
  JOIN "Genres" f4 ON f4."GenreId" = f3."GenresId"
WHERE f2."Login" = Ulogin;
END
$func$  LANGUAGE plpgsql;		
		
SELECT * FROM UserInfo('nproshyn');
		
		
		
CREATE OR REPLACE FUNCTION SortFilmsWithoutGenreWithNAME(minyear integer DEFAULT 0, maxyear integer DEFAULT 3000,
						  minduration integer DEFAULT 0, maxduration integer DEFAULT 999,
						  minprice    integer DEFAULT 0, maxprice    integer DEFAULT 999,
						  minrate     float   DEFAULT 0, maxrate     float   DEFAULT 999, nameofilm varchar(255) DEFAULT '')
  RETURNS TABLE (id                   int
	  		   , FilmName             text
               , Price                int
               , InformationAboutFilm text
			   , Filmimage            varchar(255)
			   , FilmReference        varchar(255)
			   , Dateofrelease        int
			   , Duration             int
			   , NumofVoices          bigint
			   , Rate                 float) AS
$func$
BEGIN
RETURN QUERY
SELECT f1."FilmId", f1."FilmName",  f1."Price",         f1."InformationAboutFilm",
       f2."Filmimage", f2."Filmreference", EXTRACT(YEAR FROM f2."Dateofrelease")::integer, f2."Duration",
	   f3."NumofVoices", f3."Rate"
FROM   "FilmInfo" f1
  JOIN "Filmdata" f2 ON f2."FilmId" = f1."FilmId"
  JOIN "Rating"   f3 ON f3."FilmId" = f1."FilmId"
  WHERE f1."Price"    >= @minprice    AND
        f1."Price"    <= @maxprice    AND
		f2."Duration" >= @minduration AND
        f2."Duration" <= @maxduration AND
		EXTRACT(YEAR FROM f2."Dateofrelease") >= @minyear AND
		EXTRACT(YEAR FROM f2."Dateofrelease") <= @maxyear AND
		f3."Rate"     >= @minrate     AND
        f3."Rate"     <= @maxrate     AND
		LOWER(f1."FilmName") LIKE LOWER(nameofilm)
ORDER BY f3."Rate" DESC;
END
$func$  LANGUAGE plpgsql;		

		SELECT * FROM "FilmInfo"
SELECT * FROM SortFilmsWithoutGenreWithNAME(2000, 2003,nameofilm=>'%гладИатор%'); 

