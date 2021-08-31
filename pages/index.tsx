import { Box, Flex, H1, H4, Panel } from '@bigcommerce/big-design';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

import ErrorMessage from '../components/error';
import Loading from '../components/loading';
import { useSession } from '../context/session';
import { useAlerts, useProducts } from '../lib/hooks';

const Index = ({ context }: { context: string }) => {
    const { error, isLoading, summary } = useProducts();
    const { setContext, isUpgrade } = useSession();
    const router = useRouter();
    const alertsManager = useAlerts();

    const upgrade = router.query.upgrade;

    useEffect(() => {
        if (context) setContext(context);
        if (isUpgrade) {
            alertsManager.add({
                header: `Plus Plan Active`,
                messages: [
                    {
                        text: 'You can now enjoy unlimited access to BigApp. Take app tour',
                        link: {
                            text: 'Take app tour',
                            href: '#',
                        }
                    },
                ],
                type: 'success',
                autoDismiss: true,
            });
        }
    }, [context, setContext, upgrade, isUpgrade, alertsManager]);

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;

    return (
        <Panel header="Homepage" marginHorizontal="xxxLarge">
            <Flex>
                <StyledBox border="box" borderRadius="normal" marginRight="xLarge" padding="medium">
                    <H4>Inventory count</H4>
                    <H1 marginBottom="none">{summary.inventory_count}</H1>
                </StyledBox>
                <StyledBox border="box" borderRadius="normal" marginRight="xLarge" padding="medium">
                    <H4>Variant count</H4>
                    <H1 marginBottom="none">{summary.variant_count}</H1>
                </StyledBox>
                <StyledBox border="box" borderRadius="normal" padding="medium">
                    <H4>Primary category</H4>
                    <H1 marginBottom="none">{summary.primary_category_name}</H1>
                </StyledBox>
            </Flex>
        </Panel>
    );
};

export const getServerSideProps = async ({ query }) => ({
    props: { context: query?.context ?? '' }
});

const StyledBox = styled(Box)`
    min-width: 10rem;
`;

export default Index;
