import { GetServerSidePropsContext, NextPage } from "next";
import { checkAuth } from "@/utils/checkAuth";
import React from "react";
import { Layout } from "@/layouts/Layout";

import * as Api from "@/api";
import { FileItem } from "@/api/dto/files.dto";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Files } from "@/modules/Files";

interface Props {
  items: FileItem[];
}

const DashboardPhotos: NextPage<Props> & { getLayout?: (page: React.ReactNode) => React.ReactNode } = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions />
    </DashboardLayout>
  );
};

DashboardPhotos.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Photos">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  try {
    const userData = await Api.auth.getMe();
    const items = await Api.files.getAll("photos", userData.id);

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

export default DashboardPhotos;
