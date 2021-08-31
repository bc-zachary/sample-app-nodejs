import {
    Box,
    Button,
    Flex,
    FlexItem,
    H2,
    H3,
    Text,
} from '@bigcommerce/big-design';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { useSession } from 'context/session';

export const TopBar = () => {
    const router = useRouter();
    const { isUpgrade, plan } = useSession();

    const { pathname } = router;

    const handleUpgradeLink = () => {
        router.push('/plans');
    };

    return (
        <Box
            shadow="floating"
            borderRadius="none"
            paddingVertical="xSmall"
            paddingHorizontal="xxxLarge"
            marginBottom="xxxLarge"
        >
            <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center">
                    <FlexItem marginRight="small">
                        <Image src="/BigCommerce-logomark-whitebg.png" width="22" height="22" />
                    </FlexItem>
                    <H2 marginVertical="none">BigApp</H2>
                </Flex>
                {pathname !== '/plans' ? (
                    <FlexItem>
                        {isUpgrade === false ? (
                            <Flex alignItems="center">
                                <Text marginBottom="none" color="danger">
                                    You have 3 days left in your free trial
                                </Text>
                                <Button marginLeft="medium" onClick={handleUpgradeLink}>
                                    Upgrade
                                </Button>
                            </Flex>
                        ) : (
                            <H3 color="primary" marginBottom="none">
                                {`${plan} Plan`}
                            </H3>
                        )}
                    </FlexItem>
                ) : null}
            </Flex>
        </Box>
    );
};
