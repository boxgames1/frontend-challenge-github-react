import { ApolloError } from "@apollo/client";
import { ReactNode } from "react";

type QueryResultProps = {
	children: ReactNode;
	loading: boolean;
	error: ApolloError | undefined;
	data: any;
};

const QueryResult = ({ loading, error, data, children }: QueryResultProps) => {
	if (error) {
		return <p>ERROR: {error.message}</p>;
	}
	if (loading) {
		return <p>Loading...</p>;
	}
	if (!data) {
		return <p>Nothing to show...</p>;
	}
	if (data) {
		return <>{children}</>;
	}
	return <></>;
};

export default QueryResult;
