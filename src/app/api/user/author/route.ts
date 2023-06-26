import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import bcrypt from "bcryptjs";
import formidable from "formidable";

import mime from "mime";
import path, { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import { getSession } from "next-auth/react";

/* export const config = {
  api: {
    bodyParser: false,
  },
};
 */
export async function GET(req: NextRequest) {
  const datas = [
    {
      userId: 1,
      id: 1,
      title: "delectus aut User",
      completed: true,
    },
    {
      userId: 1,
      id: 2,
      title: "User ut nam facilis et officia qui",
      completed: true,
    },
  ];
  return new Response(JSON.stringify(datas));
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, firstName, lastName, number, sexe, password, type } =
    await req.json();

  if (type == "create") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user != null)
        return new Response(
          JSON.stringify({ user: null, message: "L'email existe déjà" })
        );

      const passwordCryp = await bcrypt.hash(password, 10);
      const data = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          number,
          sexe,
          password: passwordCryp,
        },
      });
      return new Response(
        JSON.stringify({ user: data, message: "Votre compte est créer" })
      );

      /*  res.status(200).json(data); */
    } catch (error) {
      /*       res.status(500).json(error); */
    }
  }
  if (type == "user") {
 
   
    try {
      const user = await prisma.user.findUnique({
        where: {
          email:email,
        },
      });
      if (user == null)
        return new Response(
          JSON.stringify({ user: null, message: "Erreur de récupération" })
        );

      return new Response(
        JSON.stringify({ user: user, message: "Votre compte est créer" })
      );

      /*  res.status(200).json(data); */
    } catch (error) {
      /*       res.status(500).json(error); */
    }
  } else {
    try {
      const data = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (data == null)
        return new Response(
          JSON.stringify({
            user: null,
            message: "L'email n'existe pas veuillez créer votre compte",
          })
        );

      const isPasswordValid = await bcrypt.compare(password, data.password);
      if (!isPasswordValid) {
        return new Response(
          JSON.stringify({ user: null, message: "password incorrect" })
        );
      }

      return new Response(JSON.stringify({ user: data, message: "succes" }));
    } catch (error) {
      return new Response(JSON.stringify({ error: "error" }));
      /*       res.status(500).json(error); */
    }
  }
}
/* 
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix)
  }
}) */

export async function PATCH(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();

  const file = formData.get("file") as Blob | null;

  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  //const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
  const relativeUploadDir = `/uploads/`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

/*   try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
    //  await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  } */

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${file.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}${path.extname(file.name)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);

    const val = formData.get("birthDate");
    const dataUpdate = await prisma.user.update({
      where: {
        email: formData.get("email")?.toString(),
      },
      data: {
        firstName: formData.get("firstName")?.toString(),
        lastName: formData.get("lastName")?.toString(),
        sexe: formData.get("sexe")?.toString(),
        birthDate: new Date(val ? val.toString() : Date.now()),
        nina: formData.get("numberNina")?.toString(),
        number: formData.get("number")?.toString(),
        image: `${relativeUploadDir}/${filename}`,
      },
    });
    return new Response(
      JSON.stringify({
        user: dataUpdate,
        message: `Votre profile est modifier  ${val}`,
      })
    );

    return NextResponse.json({
      user: "dataUpdate",
      message: `Votre compte est modifier  `,
      fileUrl: `${relativeUploadDir}/${filename}`,
    });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }

  // saveFile(formData.get("file"))
  return new Response(
    JSON.stringify({
      user: "dataUpdate",
      message: `Votre   `,
    })
  );

  //

  const {
    email,
    firstName,
    lastName,
    number,
    sexe,
    password,
    type,
    birthDate,
    numberNina,
    image,
  } = await req.json();
  const data = await prisma.user.findFirst({
    where: {
      AND: [{ email: email }, { role: "USER" }],
    },
  });

  if (data == null)
    return new Response(
      JSON.stringify({
        user: data,
        message: "L'email n'existe pas veuillez créer votre compte",
      })
    );

  /*     return new Response(
      JSON.stringify({
        user: {},
        message: `Votre profile est  ${numberNina}`,
      })
    ); */

  const dataUpdate = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      sexe: sexe,
      birthDate: birthDate,
      nina: numberNina,
      number: number,
    },
  });
  return new Response(
    JSON.stringify({
      user: dataUpdate,
      message: `Votre profile est modifier`,
    })
  );
}
