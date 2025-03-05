import { GetServerSidePropsContext, NextPage } from "next";
import { Button } from "antd";
import React from "react";
import { User } from "@/api/dto/auth.dto";
import styles from "@/styles/Profile.module.scss";
import { checkAuth } from "@/utils/checkAuth";
import * as Api from "@/api";
import { Layout } from "@/layouts/Layout";

interface Props {
  userData: User;
}

const DashboardProfilePage: NextPage<Props> & { getLayout?: (page: React.ReactNode) => React.ReactNode } = ({ userData }) => {
  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      Api.auth.logout();
      location.href = "/";
    }
  };

  return (
    <main>
      <div className={styles.root}>
        <h1>My profile</h1>
        <br />
        <p>
          ID: <b>{userData.id}</b>
        </p>
        <p>
          Full name: <b>{userData.fullName}</b>
        </p>
        <p>
          E-Mail: <b>{userData.email}</b>
        </p>
        <br />
        <Button onClick={onClickLogout} type="primary" danger>
          Logout
        </Button>
      </div>
    </main>
  );
};

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Profile">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  const userData = await Api.auth.getMe();

  return {
    props: {
      userData,
    },
  };
};

export default DashboardProfilePage;
