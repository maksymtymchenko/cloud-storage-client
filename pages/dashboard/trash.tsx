import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";

import { checkAuth } from "@/utils/checkAuth";
import { Layout } from "@/layouts/Layout";

import * as Api from "@/api";
import { FileItem } from "@/api/dto/files.dto";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Files } from "@/modules/Files";

interface Props {
  items: FileItem[];
}

const DashboardTrash: NextPage<Props> & { getLayout?: (page: React.ReactNode) => React.ReactNode } = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} />
    </DashboardLayout>
  );
};

DashboardTrash.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Trash">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  try {
    const userData = await Api.auth.getMe();
    const items = await Api.files.getAll("trash", userData.id);

    return {
      props: {
        items,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { items: [] },
    };
  }
};

export default DashboardTrash;
