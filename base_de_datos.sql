USE [medio_ambiente]
GO
/****** Object:  Table [dbo].[tbl_admin]    Script Date: 1/12/2024 20:29:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_admin](
	[id_admin] [int] IDENTITY(1,1) NOT NULL,
	[usuario] [varchar](50) NOT NULL,
	[contraseña] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_admin] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_simulaciones]    Script Date: 1/12/2024 20:29:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_simulaciones](
	[id_simu] [int] IDENTITY(1,1) NOT NULL,
	[id_usu] [int] NOT NULL,
	[transporte] [decimal](18, 0) NOT NULL,
	[alimentacion] [decimal](18, 0) NOT NULL,
	[residuos] [decimal](18, 0) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_simu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_usuario]    Script Date: 1/12/2024 20:29:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_usuario](
	[id_usu] [int] IDENTITY(1,1) NOT NULL,
	[nombre_usuario] [varchar](25) NOT NULL,
	[contraseña] [varchar](25) NOT NULL,
	[primer_nombre] [varchar](50) NOT NULL,
	[primer_apellido] [varchar](50) NOT NULL,
	[segundo_apellido] [varchar](50) NOT NULL,
	[correo] [varchar](25) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_usu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tbl_simulaciones]  WITH CHECK ADD  CONSTRAINT [tbl_simulaciones_id_usu_fk] FOREIGN KEY([id_usu])
REFERENCES [dbo].[tbl_usuario] ([id_usu])
GO
ALTER TABLE [dbo].[tbl_simulaciones] CHECK CONSTRAINT [tbl_simulaciones_id_usu_fk]
GO
