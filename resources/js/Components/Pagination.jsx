export default function Pagination({ links, onPageChange }) {
    return (
        <div className="mt-4 flex justify-center">
            <nav>
                <ul className="flex">
                    {links.map((link) => {
                        const page = link.url
                            ? new URL(link.url).searchParams.get("page") || 1
                            : 1;

                        return (
                            <li key={link.label}>
                                <button
                                    onClick={() => onPageChange(page)}
                                    className={`px-4 py-2 mx-1 rounded ${
                                        link.active
                                            ? "bg-black text-white"
                                            : "bg-white text-black"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
